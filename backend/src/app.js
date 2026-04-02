const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

// middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  }),
);
const isProduction = process.env.NODE_ENV === "production";
app.use(morgan(isProduction ? "combined" : "dev"));

app.use(
  cors({
    origin: isProduction ? process.env.CLIENT_URL : ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, try again later.",
});

app.use(limiter);

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// db connection
const connectDB = require("./config/db");
connectDB();

// routes
const authRoutes = require("./routes/auth.routes");
const resumeRoutes = require("./routes/resume.routes");
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// centralized error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: isProduction ? {} : err,
  });
});

module.exports = app;

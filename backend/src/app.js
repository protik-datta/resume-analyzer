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

app.set("trust proxy", 1);

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
    origin: [
      "https://resume-analyzer-nine-eosin.vercel.app",
      "http://localhost:5173",
    ], // ✅ trailing slash সরানো হয়েছে
    credentials: true,
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000000000,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const connectDB = require("./config/db");
connectDB();

const authRoutes = require("./routes/auth.routes");
const resumeRoutes = require("./routes/resume.routes");
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: isProduction ? {} : err,
  });
});

module.exports = app;

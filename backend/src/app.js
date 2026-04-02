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
app.use(morgan("dev"));
app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173" ||
      "http://localhost:5174",

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
const uploadRoutes = require("./routes/resume.routes");
app.use('/api/auth', authRoutes);
app.use('/api/resume', uploadRoutes);

module.exports = app

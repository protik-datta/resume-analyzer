const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    plan: {
      type: String,
      enum: ["free", "paid"],
      default: "free",
    },

    dailyAnalysisCount: {
      type: Number,
      default: 0,
    },

    lastAnalysisDate: {
      type: Date,
      default: null,
    },

    targetIndustry: {
      type: String,
      default: null,
      trim: true,
    },

    targetRole: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

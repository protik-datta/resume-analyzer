const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    resumeText: {
      type: String,
      required: true,
    },

    jobDescription: {
      type: String,
      default: "",
      trim: true,
    },

    overallScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    atsScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    country: { type: String, default: "Unknown" },

    criticalVerdict: { type: String, default: "" },

    ats_issues: {
      type: [String],
      default: [],
    },

    top_missing_keywords: {
      type: [String],
      default: [],
    },

    experienceLevel: {
      type: String,
      enum: ["entry", "mid", "senior", "executive"],
      default: null,
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    suggestions: {
      type: [String],
      default: [],
    },

    sections: {
      experience: {
        score: { type: Number, default: 0 },
        feedback: { type: String, default: "" },
      },
      skills: {
        score: { type: Number, default: 0 },
        feedback: { type: String, default: "" },
      },
      education: {
        score: { type: Number, default: 0 },
        feedback: { type: String, default: "" },
      },
    },

    targetRole: {
      type: String,
      default: null,
      trim: true,
    },

    industry: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const analysisModel = mongoose.model("Analysis", analysisSchema);
module.exports = analysisModel;

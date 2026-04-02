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
      required: true,
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
        type: Number,
        default: 0,
      },
      skills: {
        type: Number,
        default: 0,
      },
      education: {
        type: Number,
        default: 0,
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

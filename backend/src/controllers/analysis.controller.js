const Analysis = require("../models/analysis.model");
const { analyzeResumeWithAI } = require("../services/ai.service");

const analyzeResume = async (req, res) => {
  try {
    const { targetRole, targetIndustry, jobDescription } = req.body;
    const resumeText = req.resumeText;

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Resume text not found. Please upload a resume first.",
      });
    }

    if(!targetRole || !targetIndustry || !jobDescription) {
      return res.status(400).json({
        success: false,
        message:
          "targetRole, targetIndustry, and jobDescription are required fields.",
      });
    }

    const aiResult = await analyzeResumeWithAI(
      resumeText,
      targetRole,
      targetIndustry,
      jobDescription,
    );

    const analysis = await Analysis.create({
      userId: req.user.id,
      resumeText,
      targetRole: targetRole || null,
      industry: targetIndustry || null,
      jobDescription: jobDescription || "",
      country: aiResult.country || "unknown",
      experienceLevel: aiResult.experienceLevel || "entry",
      overallScore: aiResult.overallScore ?? 0,
      atsScore: aiResult.atsScore,
      criticalVerdict: aiResult.criticalVerdict,
      strengths: aiResult.strengths,
      weaknesses: aiResult.weaknesses,
      suggestions: aiResult.suggestions,
      sections: aiResult.sections,
      ats_issues: aiResult.ats_issues,
      top_missing_keywords: aiResult.top_missing_keywords,
    });

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error. Please try again later.",
    });
  }
};

const getAnalysis = async (req, res) => {
  try {
    const analysisId = req.params.id;
    const userId = req.user.id;

    const analysis = await Analysis.findOne({
      _id: analysisId,
      userId: userId,
    }).select(
      "_id targetRole experienceLevel ats_issues top_missing_keywords country criticalVerdict overallScore atsScore strengths weaknesses suggestions sections createdAt",
    );

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error. Please try again later.",
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const analysis = await Analysis.find({ userId: userId })
      .sort({ createdAt: -1 })
      .select("_id targetRole country overallScore atsScore createdAt")
      .limit(20);

    if(analysis.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No analysis history found",
        data: []
      });
    }

    res.status(200).json({
      success: true,
      count: analysis.length,
      data: analysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error. Please try again later.",
    });
  }
};

const deleteAnalysis = async (req, res) => {
  try {
    const analysisId = req.params.id;
    const userId = req.user.id;

    const analysis = await Analysis.findOneAndDelete({
      _id: analysisId,
      userId: userId,
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Analysis deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error. Please try again later.",
    });
  }
};

const deleteAllAnalysis = async (req, res) => {
  try {
    const userId = req.user.id;
    const analysis = await Analysis.deleteMany({ userId: userId });
    if (analysis.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No analyses found to delete",
      });
    }
    res.status(200).json({
      success: true,
      message: `${analysis.deletedCount} analyses deleted successfully`,
      deletedCount: analysis.deletedCount,
    });
  } catch (error) {
    console.error("Delete All Analysis Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error. Please try again later.",
    });
  }
};

module.exports = {
  analyzeResume,
  getAnalysis,
  getHistory,
  deleteAnalysis,
  deleteAllAnalysis,
};

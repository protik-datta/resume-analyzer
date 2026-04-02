const { z } = require("zod");

const uploadRequestSchema = z.object({
  targetRole: z.string().min(2).max(100),
  targetIndustry: z.string().min(2).max(100),
  jobDescription: z.string().min(10).max(5000),
});

const aiResponseSchema = z.object({
  country: z.string(),
  experienceLevel: z.enum(["entry", "mid", "senior", "executive"]),
  overallScore: z.number().min(0).max(100),
  atsScore: z.number().min(0).max(100),
  criticalVerdict: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  suggestions: z.array(z.string()),
  sections: z.object({
    experience: z.object({
      score: z.number().min(0).max(100),
      feedback: z.string(),
    }),
    skills: z.object({
      score: z.number().min(0).max(100),
      feedback: z.string(),
    }),
    education: z.object({
      score: z.number().min(0).max(100),
      feedback: z.string(),
    }),
  }),
  ats_issues: z.array(z.string()),
  top_missing_keywords: z.array(z.string()),
});

module.exports = { uploadRequestSchema, aiResponseSchema };

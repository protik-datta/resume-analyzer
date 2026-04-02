const z = require("zod");

const analysisSchema = z.object({
  userId: z.string().min(1, "userId is required"),
  resumeText: z.string().min(1, "resumeText is required"),
  jobDescription: z.string().min(1, "jobDescription is required"),
  overallScore: z.number().min(0).max(100).optional(),
  atsScore: z.number().min(0).max(100).optional(),
  strengths: z.array(z.string()).optional(),
  weaknesses: z.array(z.string()).optional(),
  suggestions: z.array(z.string()).optional(),
  sections: z
    .object({
      experience: z.number().min(0).max(100).optional(),
      skills: z.number().min(0).max(100).optional(),
      education: z.number().min(0).max(100).optional(),
    })
    .optional(),
  targetRole: z.string().optional(),
  industry: z.string().optional(),
});

module.exports = { analysisSchema };

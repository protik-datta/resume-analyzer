const { GoogleGenerativeAI } = require("@google/generative-ai");
const cleanJson = require("../utils/cleanJson");
const { aiResponseSchema } = require("../schema/analysis.schema");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: `
You are an expert resume analyst and career coach with 15+ years of experience.

Rules:
- Always return valid JSON only.
- No markdown, no explanation, no extra text.
- Output must be parsable by JSON.parse().
- Be specific and actionable.
- Scores must be integers between 0 and 100.
`,
});

const resumeAnalysisPrompt = (
  resumeText,
  targetRole,
  targetIndustry,
  jobDescription,
) => {
  const hasJD = jobDescription && jobDescription.trim().length > 10;
  const safeText =
    resumeText.length > 4000
      ? resumeText.substring(0, 4000) + "\n[truncated]"
      : resumeText;
  return `

    You are a Senior Technical Recruiter and ATS Expert with 15 years of hiring experience across USA, UK, Canada, Australia, and South Asia.
    Your job: Evaluate this resume HONESTLY. Not to encourage — to assess if this candidate deserves an interview.

    ## RESUME TO ANALYZE:
    """
    ${safeText}
    """

    ## TARGET ROLE: ${targetRole || "Not specified — analyze for general job market"}
    ## TARGET INDUSTRY: ${targetIndustry || "Not specified"}

    ## JOB DESCRIPTION:
    """
    ${hasJD ? jobDescription : "Not provided. Analyze based on target role and industry standards."}
    """

    ## YOUR EVALUATION PROCESS:

    STEP 1 — DETECT CONTEXT:
    - Identify candidate's country from phone format, institutions, address
    - Adjust scoring to that market's standards (Bangladesh market is more lenient on gaps, US market is strict on metrics)

    STEP 2 — ATS SCAN:
    - Check keyword density vs target role
    - Identify formatting issues that break ATS parsers (tables, columns, images)
    - Check for action verbs, quantified achievements

    STEP 3 — GAP ANALYSIS:
    ${
      hasJD
        ? "- Compare JD requirements directly against resume evidence\n- Every missing required skill = score deduction\n- Vague claims without metrics = weakness"
        : "- Compare against industry standard requirements for the target role\n- Identify missing skills common for this role"
    }

    STEP 4 — VERDICT:
    - Be strict about experience level (Junior vs Mid vs Senior)
    - Ignore soft skills unless backed by specific examples
    - Give a one-line hiring verdict

    ## SCORING RULES:
    - 85-100: Exceptional, immediate interview
    - 70-84: Strong candidate, likely interview
    - 55-69: Average, borderline
    - 40-54: Weak, needs significant improvement
    - 0-39: Poor, likely ATS rejected

    ## RETURN THIS EXACT JSON (no other text):
    {
      "country": "detected country name",
      "experienceLevel": "entry | mid | senior | executive",
      "overallScore": <integer 0-100>,
      "atsScore": <integer 0-100>,
      "criticalVerdict": "One sentence: hire or not and why",
      "strengths": [
        "Specific strength with evidence from resume"
      ],
      "weaknesses": [
        "Specific weakness — what is missing or vague"
      ],
      "suggestions": [
        "Exact actionable fix — what to add/change/remove"
      ],
      "sections": {
        "experience": {
          "score": <integer 0-100>,
          "feedback": "Specific feedback on experience quality and metrics"
        },
        "skills": {
          "score": <integer 0-100>,
          "feedback": "Relevant skills vs missing skills for this role"
        },
        "education": {
          "score": <integer 0-100>,
          "feedback": "Education relevance to target role"
        }
      },
      "ats_issues": [
        "Specific formatting or keyword issue found"
      ],
      "top_missing_keywords": [
        "keyword missing from resume but important for role"
      ]
    }
    `.trim();
};

const analyzeResumeWithAI = async (
  resumeText,
  targetRole,
  targetIndustry,
  jobDescription,
) => {
  let lastError = null;

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const response = await model.generateContent(
        resumeAnalysisPrompt(
          resumeText,
          targetRole,
          targetIndustry,
          jobDescription,
        ),
      );

      const rawText = response.response.text();
      const cleanedText = cleanJson(rawText);

      if (!cleanedText) {
        throw new Error("Empty AI response");
      }

      let parsed;
      try {
        parsed = JSON.parse(cleanedText);
      } catch (err) {
        throw new Error("Invalid JSON from AI");
      }

      const validated = aiResponseSchema.safeParse(parsed);

      if (!validated.success) {
        throw new Error("AI response failed validation");
      }

      return validated.data;
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt} failed:`, error.message);

      if (attempt < 5) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  throw new Error(`AI analysis failed: ${lastError.message}`);
};

module.exports = { analyzeResumeWithAI };

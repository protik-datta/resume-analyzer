const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth.middleware");
const { analysisLimit } = require("../middlewares/analysisLimit.middleware");
const upload = require("../services/multer.service");
const validate = require("../middlewares/validate.middleware");
const {
  uploadRequestSchema,
} = require("../schema/analysis.schema");
const { uploadResume } = require("../controllers/resume.controller");
const {
  analyzeResume,
  getAnalysis,
  getHistory,
  deleteAnalysis,
  deleteAllAnalysis,
} = require("../controllers/analysis.controller");

router.post(
  "/analyze",
  authMiddleware,
  analysisLimit,
  upload.single("resume"),
  validate(uploadRequestSchema),
  uploadResume,
  analyzeResume,
);

router.get("/analysis/:id", authMiddleware, getAnalysis);
router.get("/history", authMiddleware, getHistory);
router.delete("/analysis/:id", authMiddleware, deleteAnalysis);
router.delete("/history", authMiddleware, deleteAllAnalysis);
module.exports = router;

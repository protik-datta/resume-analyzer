const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../services/multer.service");
const { uploadResume } = require("../controllers/resume.controller");

router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);

module.exports = router;

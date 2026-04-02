const path = require("path");
const fs = require("fs");
const { parsePdf } = require("../utils/parsePdf");
const cleanText = require("../utils/cleanText");

const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();

    if (ext !== ".pdf") {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: "Unsupported file type" });
    }

    const parsedText = await parsePdf(req.file.path);
    const cleanedText = cleanText(parsedText);

    fs.unlinkSync(req.file.path);

    req.resumeText = cleanedText;

    next();
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { uploadResume };

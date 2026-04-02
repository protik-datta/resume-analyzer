const path = require("path");
const fs = require("fs");
const { parsePdf } = require("../utils/parsePdf");
const cleanText = require("../utils/cleanText");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: "No file uploaded" });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();

    if (ext !== ".pdf") {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    const parsedText = await parsePdf(req.file.path);
    const cleanedtext = cleanText(parsedText);

    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      textLength: cleanedtext.length,
      text: cleanedtext,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { uploadResume };

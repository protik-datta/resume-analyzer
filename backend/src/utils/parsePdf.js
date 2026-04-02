const fs = require("fs");
const pdfParse = require("pdf-parse");

const parsePdf = async (filepath) => {
  try {
    const dataBuffer = fs.readFileSync(filepath);
    const pdf = await pdfParse(dataBuffer);
    return pdf.text;
  } catch (error) {
    console.log("PDF Parse Error", error.message);
    throw error;
  }
};

module.exports = { parsePdf };

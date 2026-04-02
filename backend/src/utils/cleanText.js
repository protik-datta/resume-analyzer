const cleanText = (text) => {
  return text
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

module.exports = cleanText;

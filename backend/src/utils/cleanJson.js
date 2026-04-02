const cleanJson = (text) => {
  try {
    if (!text) throw new Error("Empty response");

    let cleaned = text
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/gi, "")
      .trim();

    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("No JSON object found");
    }

    cleaned = cleaned.slice(firstBrace, lastBrace + 1);

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("JSON Parse Error:", error.message);

    return null;
  }
};

module.exports = cleanJson;

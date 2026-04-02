const cleanJson = (text) => {
  if (!text) return null;

  let cleaned = text.trim();

  // markdown code block remove করো
  cleaned = cleaned.replace(/^```json\s*/i, "");
  cleaned = cleaned.replace(/^```\s*/i, "");
  cleaned = cleaned.replace(/\s*```\s*$/i, "");
  cleaned = cleaned.trim();
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) return null;
  return cleaned.substring(firstBrace, lastBrace + 1);
};

module.exports = cleanJson;

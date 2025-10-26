const LearningContent = require("../models/LearningContentModel.js");
const PdfDocument = require("../models/PdfDocument.js");
const { GroqLLM } = require("../utils/groqLLM.js");

const generateLearningContent = async (req, res) => {
  try {
    const { pdfId, userId, topic } = req.body;

    if (!pdfId || !userId || !topic) {
      return res.status(400).json({ success: false, message: "Missing data" });
    }

    const pdfDoc = await PdfDocument.findById(pdfId);
    if (!pdfDoc)
      return res.status(404).json({ success: false, message: "PDF not found" });

    const prompt = `
      You are an AI tutor.
      Read the following PDF content and create learning material for the topic "${topic}".
      Respond strictly in valid JSON with this structure:
      {
        "summary": "<concise summary>",
        "importantPoints": ["point1", "point2", ...],
        "questions": [{"question": "<text>", "answer": "<text>"}, ...],
        "conclusion": "<text>",
        "resources": ["resource1", "resource2", ...]
      }

      PDF Content:
      ${pdfDoc.text}
    `;

    const llm = new GroqLLM();
    const response = await llm.call({ input: prompt });

    let cleanResponse = response.trim();
    if (cleanResponse.startsWith("```json")) {
      cleanResponse = cleanResponse.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (cleanResponse.startsWith("```")) {
      cleanResponse = cleanResponse.replace(/^```/, "").replace(/```$/, "").trim();
    }

    let content;
    try {
      content = JSON.parse(cleanResponse);
    } catch (err) {
      console.warn("LLM response not valid JSON — storing raw text instead");
      content = { rawText: response };
    }

    const learningContent = await LearningContent.create({
      pdfId,
      userId,
      topic,
      content,
    });

    res.json({ success: true, learningContent });
  } catch (err) {
    console.error("Learning content generation error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllLearningContents = async (req, res) => {
  try {
    const contents = await LearningContent.find()
      .populate("pdfId", "filename")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, contents });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getLearningContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await LearningContent.findById(id)
      .populate("pdfId", "filename")
      .populate("userId", "name email");

    if (!content)
      return res.status(404).json({ success: false, message: "Content not found" });

    res.json({ success: true, content });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteLearningContent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await LearningContent.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ success: false, message: "Content not found" });

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Ask a question about learning content
const askQuestion = async (req, res) => {
  try {
    const { pdfId, userId, question } = req.body;

    if (!pdfId || !userId || !question) {
      return res.status(400).json({ success: false, message: "Missing data" });
    }

    const content = await LearningContent.findById(pdfId);
    if (!content) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    const llm = new GroqLLM();
    const response = await llm.call({
      input: `Answer this question based on the learning content: "${question}"\nContent: ${JSON.stringify(content.content)}`
    });

    res.json({ success: true, answer: response.trim() });
  } catch (err) {
    console.error("Ask Question Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  generateLearningContent,
  getAllLearningContents,
  getLearningContentById,
  deleteLearningContent,
  askQuestion
};
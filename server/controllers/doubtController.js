import Bot from "../models/doubtModel.js";
import PdfDocument from "../models/PdfDocument.js";
import { GroqLLM } from "../utils/groqLLM.js";

/**
 * Create a new chat bot session (after user uploads a PDF and enters a topic)
 */
const createBotSession = async (req, res) => {
  try {
    const { pdfId, userId, topic, description } = req.body;

    if (!pdfId || !userId || !topic) {
      return res.status(400).json({ success: false, message: "Missing required data" });
    }

    const pdfDoc = await PdfDocument.findById(pdfId);
    if (!pdfDoc) {
      return res.status(404).json({ success: false, message: "PDF not found" });
    }

    const botSession = await Bot.create({
      userId,
      pdfId,
      topic,
      description,
    });

    res.json({ success: true, message: "Bot session created successfully", botSession });
  } catch (err) {
    console.error("Error creating bot session:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Chat with the uploaded PDF — LLM response based on content
 */
const chatWithPDF = async (req, res) => {
  try {
    const { botId, sender, message } = req.body;

    if (!botId || !sender || !message) {
      return res.status(400).json({ success: false, message: "Missing chat parameters" });
    }

    const bot = await Bot.findById(botId).populate("pdfId");
    if (!bot) return res.status(404).json({ success: false, message: "Bot session not found" });

    // Save user message
    bot.chats.push({ sender, message });
    bot.totalMessages += 1;

    // Use GroqLLM to generate context-based response
    const pdfText = bot.pdfId.text || "No PDF content available.";
    const prompt = `
      You are an AI tutor assisting the user with the PDF titled "${bot.pdfId.filename}".
      Topic: ${bot.topic}
      The user asked: "${message}"
      Use only information from the following PDF text to answer:
      ---
      ${pdfText}
      ---
      Respond clearly and concisely.
    `;

    const llm = new GroqLLM();
    const aiResponse = await llm.call({ input: prompt });

    // Save bot response
    bot.chats.push({ sender: "bot", message: aiResponse });
    bot.totalMessages += 1;
    bot.lastInteraction = new Date();

    await bot.save();

    res.json({
      success: true,
      botId: bot._id,
      userMessage: message,
      botResponse: aiResponse,
      chats: bot.chats,
    });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Get chat history for a specific bot session
 */
const getBotChats = async (req, res) => {
  try {
    const { id } = req.params;
    const bot = await Bot.findById(id)
      .populate("pdfId", "filename")
      .populate("userId", "name email");

    if (!bot) return res.status(404).json({ success: false, message: "Bot session not found" });

    res.json({ success: true, chats: bot.chats, topic: bot.topic, pdf: bot.pdfId.filename });
  } catch (err) {
    console.error("Get chats error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Get all bot sessions for admin or debugging
 */
const getAllBotSessions = async (req, res) => {
  try {
    const bots = await Bot.find()
      .populate("pdfId", "filename")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, bots });
  } catch (err) {
    console.error("Get all bots error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Delete a bot session
 */
const deleteBotSession = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Bot.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ success: false, message: "Bot session not found" });

    res.json({ success: true, message: "Bot session deleted successfully" });
  } catch (err) {
    console.error("Delete bot error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export {
  createBotSession,
  chatWithPDF,
  getBotChats,
  getAllBotSessions,
  deleteBotSession,
};
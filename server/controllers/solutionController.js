import axios from "axios";
import Solution from "../models/solutionReviewModel.js"

const GEMINI_API_KEY = 'AIzaSyD1ftxaP569L8qBWaLSH7NcLgGJALHWhsM';

export const solutionFinder = async (req, res) => {
  const { userId, message, topic } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: "User ID and message are required" });
  }

  try {
    // Save user's message
    await Solution.create({
      userId,
      role: "user",
      topic: topic || "General",
      message,
    });

    const prompt = `
      You are an expert educational instructor.
      Explain clearly and concisely to a student, providing step-by-step guidance if needed.
      Use examples and simple explanations for better understanding.
      Topic: ${topic || "General"}
      User's question: "${message}"
      Respond in a helpful and educational manner.
    `;

    // Gemini API request
    const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
          { contents: [{ parts: [{ text: prompt }] }] }
        );
    
    // Extract AI reply
    const reply = response.data.candidates[0].content.parts[0].text ||
      "Sorry, I couldn't generate a response. Please try again.";

    // Save AI response
    await Solution.create({
      userId,
      role: "assistant",
      topic: topic || "General",
      message: reply,
    });

    res.json({ success: true, reply });
  } catch (error) {
    console.error("AI API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
};
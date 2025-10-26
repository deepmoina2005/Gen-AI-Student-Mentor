import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Upload PDF with userId
export const uploadPDFAPI = async ({ file, userId }) => {
  try {
    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("userId", userId); // include userId

    const response = await axios.post(`${BASE_URL}/upload/pdf`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data; // { id, text }
  } catch (error) {
    console.error("Upload PDF API Error:", error.response?.data || error);
    throw error;
  }
};

// Create a new bot session
export const createBotSessionAPI = async ({ userId, pdfId, topic, description }) => {
  try {
    const response = await axios.post(`${BASE_URL}/doubt/create`, {
      userId,
      pdfId,
      topic,
      description,
    });
    return response.data;
  } catch (error) {
    console.error("Create Bot Session API Error:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

// Send chat message to bot
export const chatWithPDFAPI = async ({ botId, userMessage }) => {
  try {
    const response = await axios.post(`${BASE_URL}/doubt/chat`, {
      botId,
      sender: "user",
      message: userMessage,
    });
    return response.data;
  } catch (error) {
    console.error("Chat With PDF API Error:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

// Get chat history for a bot session
export const getBotChatsAPI = async (botId) => {
  try {
    const response = await axios.get(`${BASE_URL}/doubt/${botId}`);
    return response.data;
  } catch (error) {
    console.error("Get Bot Chats API Error:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

// Get all bot sessions (optional)
export const getAllBotSessionsAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/doubt`);
    return response.data;
  } catch (error) {
    console.error("Get All Bot Sessions API Error:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

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

// Generate AI Learning Content
export const generateContentAPI = async ({ pdfId, userId, topic }) => {
  try {
    const response = await axios.post(`${BASE_URL}/learning/generate`, { pdfId, userId, topic });
    return response.data; // { success: true, learningContent }
  } catch (error) {
    console.error("Generate Content API Error:", error.response?.data || error);
    throw error;
  }
};

// Ask a Question from PDF / Learning Content
export const askQuestionAPI = async ({ pdfId, userId, question }) => {
  try {
    const response = await axios.post(`${BASE_URL}/learning/ask`, { pdfId, userId, question });
    return response.data; // { success: true, answer }
  } catch (error) {
    console.error("Ask Question API Error:", error.response?.data || error);
    throw error;
  }
};

// Get All Learning Contents
export const getAllLearningContentsAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/learning`);
    return response.data;
  } catch (error) {
    console.error("Get All Learning Contents API Error:", error.response?.data || error);
    throw error;
  }
};

// Get Single Learning Content
export const getLearningContentByIdAPI = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/learning/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get Learning Content By ID API Error:", error.response?.data || error);
    throw error;
  }
};

// Delete Learning Content
export const deleteLearningContentAPI = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/learning/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete Learning Content API Error:", error.response?.data || error);
    throw error;
  }
};

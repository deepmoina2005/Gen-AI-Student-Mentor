// src/services/examService.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// ----------------- Upload PDF with userId -----------------
export const uploadPDFAPI = async ({ file, userId }) => {
  if (!file || !userId) {
    throw { message: "Missing file or userId" };
  }

  try {
    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("userId", userId);

    const response = await axios.post(`${BASE_URL}/upload/pdf`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data; // Expected: { id, text }
  } catch (error) {
    console.error("Upload PDF API Error:", error.response?.data || error);
    throw error.response?.data || { message: "Upload PDF failed" };
  }
};

// ----------------- Generate Exam from existing PDF -----------------
export const generateExamAPI = async ({ userId, title, pdfId }) => {
  if (!userId || !title || !pdfId) {
    throw { message: "Missing required fields" };
  }

  try {
    const response = await axios.post(`${BASE_URL}/exam/generate`, {
      userId,
      title,
      pdfId,
    });

    return response.data; // Expected: { success, exam }
  } catch (error) {
    console.error("Generate Exam API Error:", error.response?.data || error);
    throw error.response?.data || { message: "Generate Exam failed" };
  }
};

// ----------------- Get all exams for a user -----------------
export const getUserExamsAPI = async (userId) => {
  if (!userId) throw { message: "Missing userId" };

  try {
    const response = await axios.get(`${BASE_URL}/exam/user/${userId}`);
    return response.data.exams; // Array of exams
  } catch (error) {
    console.error("Get User Exams API Error:", error.response?.data || error);
    throw error.response?.data || { message: "Fetch exams failed" };
  }
};

// ----------------- Get Exam by ID -----------------
export const getExamByIdAPI = async (examId) => {
  if (!examId) throw { message: "Missing examId" };

  try {
    const response = await axios.get(`${BASE_URL}/exam/${examId}`);
    return response.data.exam; // Single exam object
  } catch (error) {
    console.error("Get Exam By ID API Error:", error.response?.data || error);
    throw error.response?.data || { message: "Get Exam failed" };
  }
};

// ----------------- Delete Exam -----------------
export const deleteExamAPI = async (examId) => {
  if (!examId) throw { message: "Missing examId" };

  try {
    const response = await axios.delete(`${BASE_URL}/exam/${examId}`);
    return response.data; // { success, message }
  } catch (error) {
    console.error("Delete Exam API Error:", error.response?.data || error);
    throw error.response?.data || { message: "Delete Exam failed" };
  }
};

// ----------------- Check Answers API -----------------
export const checkAnswersAPI = async ({ examId, userAnswers }) => {
  if (!examId || !Array.isArray(userAnswers)) {
    throw { message: "Missing examId or invalid userAnswers" };
  }

  try {
    const response = await axios.post(`${BASE_URL}/exam/checkAnswers`, {
      examId,
      userAnswers,
    });

    return response.data.results; // Array with { question, options, userAnswer, correctAnswer, isCorrect }
  } catch (error) {
    console.error("Check Answers API Error:", error.response?.data || error);
    throw error.response?.data || { message: "Check answers failed" };
  }
};

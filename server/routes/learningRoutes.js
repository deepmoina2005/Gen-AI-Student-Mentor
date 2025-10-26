import express from "express";
import {
  generateLearningContent,
  getAllLearningContents,
  getLearningContentById,
  deleteLearningContent,
  askQuestion,
} from "../controllers/learningController.js";

const learningRouter = express.Router();

// Generate full learning content
learningRouter.post("/generate", generateLearningContent);

// Ask a question based on a PDF
learningRouter.post("/ask", askQuestion);

// Get all learning contents
learningRouter.get("/", getAllLearningContents);

// Get one learning content by ID
learningRouter.get("/:id", getLearningContentById);

// Delete learning content by ID
learningRouter.delete("/:id", deleteLearningContent);

export default learningRouter;

const express = require("express");
const {
  generateLearningContent,
  getAllLearningContents,
  getLearningContentById,
  deleteLearningContent,
} = require("../controllers/learningController.js");

// Import the new askQuestion controller
const { askQuestion } = require("../controllers/learningController.js");

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

module.exports = learningRouter;
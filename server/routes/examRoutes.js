import express from "express";
import {
  generateExam,
  getExamById,
  getUserExams,
  deleteExam,
  checkAnswers,
} from "../controllers/examController.js";

const router = express.Router();

router.post("/generate", generateExam);
router.get("/:examId", getExamById);
router.get("/user/:userId", getUserExams);
router.delete("/:examId", deleteExam);
router.post("/checkAnswers", checkAnswers);

export default router;

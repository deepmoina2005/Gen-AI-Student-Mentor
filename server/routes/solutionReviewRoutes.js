import express from "express";
import { solutionFinder } from "../controllers/solutionController.js";
const solutionRouter = express.Router();

solutionRouter.post("/get-response", solutionFinder);

export default solutionRouter;
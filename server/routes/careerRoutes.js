import express from "express";
import { getCareerOptions, getCareerScope } from "../controllers/careerController.js";

const careerRouter = express.Router();

careerRouter.get("/options", getCareerOptions);
careerRouter.post("/scope", getCareerScope);

export default careerRouter;
import express from "express";
import { getResources } from "../controllers/resourceController.js";

const resourceRouter = express.Router();

resourceRouter.get("/get-resource", getResources);

export default resourceRouter;

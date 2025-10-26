const express = require("express");
const solutionRouter = express.Router();
const { solutionFinder } = require("../controllers/solutionController.js");

// POST: send user message and get AI response
solutionRouter.post("/get-response", solutionFinder);

module.exports = solutionRouter;

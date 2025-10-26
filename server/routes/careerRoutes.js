const express = require("express");
const careerRouter = express.Router();

const {
  getCareerOptions,
  getCareerScope,
} = require("../controllers/careerController.js");

careerRouter.get("/options", getCareerOptions);

careerRouter.post("/scope", getCareerScope);

module.exports = careerRouter;

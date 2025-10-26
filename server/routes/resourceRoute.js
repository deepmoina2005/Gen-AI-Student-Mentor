const express = require("express");
const { getResources } = require("../controllers/resourceController.js");

const resourceRouter = express.Router();

resourceRouter.get("/get-resource", getResources);

module.exports = resourceRouter;

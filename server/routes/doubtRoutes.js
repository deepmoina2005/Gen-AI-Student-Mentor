const express = require("express");
const {
  createBotSession,
  chatWithPDF,
  getBotChats,
  getAllBotSessions,
  deleteBotSession,
} = require("../controllers/doubtController.js")
const doubtrouter = express.Router();

doubtrouter.post("/create", createBotSession);
doubtrouter.post("/chat", chatWithPDF);
doubtrouter.get("/:id", getBotChats);
doubtrouter.get("/", getAllBotSessions);
doubtrouter.delete("/:id", deleteBotSession);

module.exports = doubtrouter;
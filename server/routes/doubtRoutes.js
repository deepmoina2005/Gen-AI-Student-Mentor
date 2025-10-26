import express from "express";
import {
  createBotSession,
  chatWithPDF,
  getBotChats,
  getAllBotSessions,
  deleteBotSession,
} from "../controllers/doubtController.js";

const doubtrouter = express.Router();

doubtrouter.post("/create", createBotSession);
doubtrouter.post("/chat", chatWithPDF);
doubtrouter.get("/:id", getBotChats);
doubtrouter.get("/", getAllBotSessions);
doubtrouter.delete("/:id", deleteBotSession);

export default doubtrouter;
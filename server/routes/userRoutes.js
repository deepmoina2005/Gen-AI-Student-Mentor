const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require("../controllers/userController");
const userAuth = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", userAuth, getUserProfile);
userRouter.post("/logout", userAuth, logoutUser);

module.exports = userRouter;
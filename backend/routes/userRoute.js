import express from "express";
import {
  registerUser,
  loginUser,
  getUserData,
  updateUserData,
} from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/authUser.js";
import upload from "../middlewares/multar.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-data", authenticateUser, getUserData);

userRouter.put(
  "/update-profile",
  upload.single("image"),
  authenticateUser,
  updateUserData
);

export default userRouter;

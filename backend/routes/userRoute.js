import express from "express";
import {
  registerUser,
  loginUser,
  getUserData,
  updateUserData,
  bookAppointment,
  getAvailableTimes,
} from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/authUser.js";
import upload from "../middlewares/multar.js";

const userRouter = express.Router();

userRouter.get("/get-data", authenticateUser, getUserData);

userRouter.post("/time-available", getAvailableTimes);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/book-appointment", authenticateUser, bookAppointment);

userRouter.put(
  "/update-profile",
  upload.single("image"),
  authenticateUser,
  updateUserData
);

export default userRouter;

import express from "express";
import { registerUser, loginUser, getUserData } from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-data",  authenticateUser, getUserData);

export default userRouter;

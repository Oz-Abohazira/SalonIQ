import express from "express";
import { addService, loginAdmin } from "../controllers/adminController.js";
import upload from "../middlewares/multar.js";
import { authenticateAdmin } from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/add-service", authenticateAdmin, upload.single("image"), addService);
adminRouter.post('/login', loginAdmin);

export default adminRouter;

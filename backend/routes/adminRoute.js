import express from "express";
import {
  getAllDoctors,
  addService,
  loginAdmin,
} from "../controllers/adminController.js";
import upload from "../middlewares/multar.js";
import { authenticateAdmin } from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/serviceController.js";

const adminRouter = express.Router();

adminRouter.post(
  "/add-service",
  authenticateAdmin,
  upload.single("image"),
  addService
);

adminRouter.post("/login", loginAdmin);
adminRouter.get("/all-services", authenticateAdmin, getAllDoctors);
adminRouter.put("/change-availability", authenticateAdmin, changeAvailability);

export default adminRouter;

import express from "express";
import {
  getAllServices,
  addService,
  loginAdmin,
  getAllAppointments,
  cancelAppointment,
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
adminRouter.post("/cancel-appointment", authenticateAdmin, cancelAppointment);

adminRouter.get("/all-services", authenticateAdmin, getAllServices);
adminRouter.get("/all-appointments", authenticateAdmin, getAllAppointments);

adminRouter.put("/change-availability", authenticateAdmin, changeAvailability);

export default adminRouter;

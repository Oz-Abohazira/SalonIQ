import express from "express";
import { getServiceList } from "../controllers/serviceController.js";

const serviceRouter = express.Router();

serviceRouter.get("/list", getServiceList);

export default serviceRouter;

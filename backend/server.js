import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import serviceRouter from "./routes/serviceRoute.js";
import userRouter from "./routes/userRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// Health check that doesn't wait on external services
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Working Fine - Serverless",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Lazy init for serverless (first /api request only)
let initDone = false;
let initPromise = null;
async function ensureInit() {
  if (initDone) return;
  if (!initPromise) {
    initPromise = Promise.all([connectDB(), connectCloudinary()])
      .then(() => {
        initDone = true;
        console.log("Initialization complete");
      })
      .catch((err) => {
        console.error("Initialization failed:", err);
        // do not rethrow to avoid hanging the function
      });
  }
  await initPromise;
}

// Apply init before API routes
app.use("/api", async (req, res, next) => {
  await ensureInit();
  next();
});

// API Endpoints
app.use("/api/admin", adminRouter);
app.use("/api/service", serviceRouter);
app.use("/api/user", userRouter);

// Local dev only
if (!process.env.VERCEL) {
  app.listen(port, () => console.log("Server Started at " + port));
}

export default app;
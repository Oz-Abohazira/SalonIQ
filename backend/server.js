import express from "express";
import cors from "cors";
import "dotenv/config";
// import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import serviceRouter from "./routes/serviceRoute.js";
import userRouter from "./routes/userRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
// connectDB();
// connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
// app.use("/api/admin", adminRouter);
// app.use("/api/service", serviceRouter);
// app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Working Fine - Serverless",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Test endpoint without DB
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Test endpoint working",
    envVarsPresent: {
      mongoUri: !!process.env.MODGODB_URI,
      cloudinaryName: !!process.env.CLOUDINARY_NAME,
      jwtSecret: !!process.env.JWT_SECRET,
    },
  });
});

if (process.env.NODE_ENV && process.env.NODE_ENV !== "production") {
  app.listen(port, () => console.log("Server Started at " + port));
}

// app.listen(port, () => console.log("Server Started at " + port));
export default app;

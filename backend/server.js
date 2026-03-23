import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import passport from "./config/passport.js";

import authRoutes from "./routes/authRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import clinicRoutes from "./routes/clinicRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import patientDataRoutes from "./routes/patientDataRoutes.js";

dotenv.config();

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// Serve uploaded files
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "backend", "uploads")),
);

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.warn(
        "MongoDB URI is not defined in environment variables. Starting server without DB connection.",
      );
      return;
    }
    await mongoose.connect(mongoURI);
    console.log("MongoDB connection successful");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Don't exit process in serverless - it will crash the function
  }
};

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/patient-data", patientDataRoutes);

app.use("/api", apiRoutes);
app.use("/api/hospitals", hospitalRoutes);

app.get("/api/db-test", async (req, res) => {
  try {
    const status = mongoose.connection.readyState;
    const states = ["disconnected", "connected", "connecting", "disconnecting"];
    res.json({ 
      status: states[status], 
      connected: status === 1,
      dbName: mongoose.connection.name 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hospital Management System Backend API is running");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import waterRoutes from "./routes/water.route.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config({ override: true });
await connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    body: req.body,
    contentType: req.get('Content-Type')
  });
  next();
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/water", waterRoutes);

// Fallback 404
app.use((req, res) => res.status(404).json({ msg: "Not found" }));

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth server running on ${PORT}`));

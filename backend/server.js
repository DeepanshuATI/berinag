import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import waterRoutes from "./routes/water.route.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    body: req.body,
    contentType: req.get('Content-Type')
  });
  next();
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..')));


app.use("/api/auth", authRoutes);
app.use("/api/water", waterRoutes);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});


app.use((req, res) => res.status(404).json({ msg: "Not found" }));


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Auth server running on ${PORT}`));

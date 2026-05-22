import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import problemRoutes from "./Routes/ProblemRoute";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/problems", problemRoutes);

const PORT = process.env.PORT || 5002;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error("MONGO_URL is not defined in env");
  process.exit(1);
}
  

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URL);

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.log("Database connection failed:", error);
  }
};

startServer();
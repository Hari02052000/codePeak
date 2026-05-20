import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import problemRoutes from "./Routes/ProblemRoute";

dotenv.config({ path: "./keys.env" });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/problems", problemRoutes);

const Mongourl = "mongodb://localhost:27017/codePeak";

const PORT = 5002;

const startServer = async () => {
  try {
    await mongoose.connect(Mongourl);

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.log("Database connection failed:", error);
  }
};

startServer();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import router from "./Routes/QuestionRoute";

dotenv.config({ path: "./keys.env" });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/question", router);

const Mongourl = process.env.MONGO_URL as string;

mongoose
  .connect(Mongourl)
  .then(() => console.log("MongoDB Connected"))
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }
  });

const PORT = 5002;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
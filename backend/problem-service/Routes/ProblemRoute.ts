
import express from "express";
import {createQuestion,
  getQuestions,
  getQuestionById
} from "../Controllers/problemcontroller";

const router = express.Router();

router.post("/", createQuestion);
router.get("/", getQuestions);
router.get("/:id", getQuestionById);

export default router;
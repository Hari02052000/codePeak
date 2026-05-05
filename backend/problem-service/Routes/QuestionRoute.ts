import express from'express';
import { Router } from "express";
import { getQuestions ,createQuestion} from '../Controllers/QuestionControllers';

const router = Router();


router.get("/getQuestions", getQuestions);

export default router;
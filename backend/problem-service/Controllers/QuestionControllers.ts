import { Request, Response } from "express";
import Question from "../Models/QuestionModel";


export const getQuestions = async (req: Request, res: Response) => {
     const Questions = await Question.find();
  res.send(Questions);
};


export const createQuestion = async (req: Request, res: Response) => {
  const data = req.body;
  res.send(data);
};
import { Request, Response } from "express";
import Question from "../Models/QuestionModel";
import TestCase from "../Models/TestModel";
import mongoose from "mongoose";

export const getQuestions = async (req: Request, res: Response) => {
  const Questions = await Question.find();
  res.send(Questions);
};


export const createQuestion = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body;

    // Validate exactly 3 testcases
    if (!data.testcases || data.testcases.length !== 3) {
      return res.status(400).json({
        message: "Exactly 3 testcases are required!",
      });
    }

    // Create Question
    const newQuestion = await Question.create({
      title: data.title,
      difficulty: data.difficulty,
      description: data.description,
      editorial: data.editorial,
    });

    // Save test cases
    await Promise.all(
      data.testcases.map(
        async (testcase: {
          input: string;
          output: string;
          explanation?: string;
        }) => {
          await TestCase.create({
            input: testcase.input,
            output: testcase.output,
            explanation: testcase.explanation,
            questionId: newQuestion._id,
          });
        }
      )
    );

    res.status(201).json({
      message: "Question created successfully",
      question: newQuestion,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error creating question",
      error,
    });
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const question = await Question.findById(id);
  res.send(question);
};


export const deleteQuestionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Question.findByIdAndDelete(id);
  res.send({ message: "Question deleted successfully" });
};


export const FilterQuestionByDifficulty = async (
  req: Request,
  res: Response
) => {
  const { difficulty } = req.params;
  const questions = await Question.find({ difficulty: difficulty });
  res.send(questions);
};
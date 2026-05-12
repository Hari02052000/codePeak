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

    // save all testcases together
    const savedTestCases = await Promise.all(
      data.testcases.map(
        async (testcase: {
          input: string;
          output: string;
          explanation: string;
        }) => {
          const newTestCase = new TestCase(testcase);

          return await newTestCase.save();
        }
      )
    );

    // extract ids
    const testcaseIds: mongoose.Types.ObjectId[] =
      savedTestCases.map((tc) => tc._id);

    // create question
    const newQuestion = new Question({
      title: data.title,
      difficulty: data.difficulty,
      description: data.description,
      editorial: data.editorial,
      testcases: testcaseIds,
    });

    await newQuestion.save();

    res.status(201).json(newQuestion);

  } catch (error) {
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
}
export const FilterQuestionByDifficulty = async (req: Request, res: Response) => {
  const { difficulty } = req.params;
  const questions = await Question.find({ "Difficulty": difficulty });
  res.send(questions);
}
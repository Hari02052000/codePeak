import { Request, Response } from "express";
import Question from "../Models/QuestionModel";
import TestCase from "../Models/TestModel";
import mongoose from "mongoose";

export const getQuestions = async (req: Request, res: Response) => {
  const Questions = await Question.find();
  res.send(Questions);
};


export const createQuestion = async (req: Request, res: Response) => {

  const session = await mongoose.startSession();

  try {
    const data = req.body;

    if (!data.testcases || data.testcases.length !== 3) {
      res.status(400).json({
        message: "Exactly 3 testcases are required!",
      });
      return;  
    }

    session.startTransaction();


    const newQuestion = new Question({
      title: data.title,
      difficulty: data.difficulty,
      description: data.description,
      editorial: data.editorial,
      testcases: [],  
    });


    await newQuestion.save({ session });

    const savedTestCases = await Promise.all(
      data.testcases.map(
        async (testcase: {
          input: string;
          output: string;
          explanation: string;
        }) => {
          const newTestCase = new TestCase({
            input: testcase.input,
            output: testcase.output,
            explanation: testcase.explanation,
            questionId: newQuestion._id,  
          });

          return await newTestCase.save({ session });
        }
      )
    );

    const testcaseIds: mongoose.Types.ObjectId[] =
      savedTestCases.map((tc) => tc._id);

    newQuestion.testcases = testcaseIds;
    await newQuestion.save({ session });  

    await session.commitTransaction();

    res.status(201).json(newQuestion);

  } catch (error) {


    await session.abortTransaction();

    res.status(500).json({
      message: "Error creating question — nothing was saved!",
      error,
    });

  } finally {

    session.endSession();
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
  const questions = await Question.find({ Difficulty: difficulty });
  res.send(questions);
};
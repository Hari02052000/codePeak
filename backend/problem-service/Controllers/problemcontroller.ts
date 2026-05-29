import { Request, Response } from "express";
import Problem from "../Models/ProblemModel";
import TestCase from "../Models/TestModel";
import mongoose from "mongoose";

export const getProblems = async (req: Request, res: Response) => {
  const Problems = await Problem.find();
  res.send(Problems);
};


export const createProblem = async (
  req: Request,
  res: Response
) => {
    // const session = await mongoose.startSession();

  try {
    // session.startTransaction();

    const { title, difficulty, description, editorial, testCases } = req.body;

    // 1. Create Problem
    const problem = await Problem.create(
      [
        {
          title,
          difficulty,
          description,
          editorial,
        },
      ]
     // { session }
    );

    const createdProblem = problem[0];

    // 2. Attach problemId to test cases
    const testCaseDocs =
      testCases?.map((tc: any) => ({
        input: tc.input,
        output: tc.output,
        explanation: tc.explanation,
        problemId: createdProblem._id,
      })) || [];

    // 3. Insert test cases
    await TestCase.insertMany(testCaseDocs, 
     // { session }
    );

    // 4. Commit transaction
   // await session.commitTransaction();
    //session.endSession();
    return res.status(201).json({
      message: "Problem created successfully",
      problem: createdProblem,
    });
  } catch (error) {
    // rollback if anything fails
   // await session.abortTransaction();
   // session.endSession();

    return res.status(500).json({
      message: "Failed to create problem",
      error,
    });
  }
};

export const getProblemById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const problem = await Problem.findById(id);
  res.send(problem);
};


export const deleteProblemById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Problem.findByIdAndDelete(id);
  res.send({ message: "Problem deleted successfully" });
};

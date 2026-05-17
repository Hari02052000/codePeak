

import { Request, Response } from "express";
import mongoose from "mongoose";

import Problem from "../Models/QuestionModel";
import TestCase from "../Models/TestModel";

export const createProblem = async (
  req: Request,
  res: Response
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const {
      title,
      difficulty,
      description,
      editorial,
      testcases,
    } = req.body;

    // save all testcases
    const savedTestCases = await TestCase.insertMany(
      testcases,
      { session }
    );

    // get testcase ids
    const testcaseIds = savedTestCases.map(
      (tc) => tc._id
    );

    // create problem
    const newProblem = await Problem.create(
      [
        {
          title,
          difficulty,
          description,
          editorial,
          testcases: testcaseIds,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      problem: newProblem[0],
    });

  } catch (error: any) {

    await session.abortTransaction();

    res.status(500).json({
      success: false,
      message: "Problem creation failed",
      error: error.message,
    });

  } finally {

    session.endSession();

  }
};
export const updateProblem = async (
  req: Request,
  res: Response
) => {
  try {

    const { id } = req.params;

    const updatedProblem = await Problem.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProblem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      problem: updatedProblem,
    });

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const getProblem = async (
  req: Request,
  res: Response
) => {
  try {
    const getallProblems = await Problem.find()

    

    res.status(200).json({
      success: true,
      problems: getallProblems,
    });

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const getProblembyId = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const getProblembyId = await Problem.findById(id);

    if (!getProblembyId) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      problem: getProblembyId,
    });

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
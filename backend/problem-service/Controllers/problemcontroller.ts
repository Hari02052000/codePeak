import { Request, Response } from "express";
import Problem from "../Models/ProblemModel";
import TestCase from "../Models/TestModel";
import QuestionNumber from "../Models/QuestionNumber";
import mongoose from "mongoose";

export const getProblems = async (req: Request, res: Response) => {
    interface QueryType {
    questiontype?: string;
    difficulty?: string;
    search?: string;
  }

  const query = req.query as QueryType;

  let filter: any = {};

  if (query.search) {
    filter.title = {
      $regex: query.search,
      $options: "i"
    };
  }

  if (query.difficulty) {
    filter.difficulty = query.difficulty  ;
  }
   if (query.questiontype) {
    filter.questiontype = query.questiontype  ;

  }
  const problem  = await Problem.find(filter);

  
 return res.status(200).json(problem);


};


export const createProblem = async (
  req: Request,
  res: Response
) => {
    // const session = await mongoose.startSession();

  try {
    // session.startTransaction();
let questionNumber= await QuestionNumber.find();
console.log(questionNumber);
if(questionNumber.length===0){
  await QuestionNumber.create({number:1});
  questionNumber= await QuestionNumber.find();
}
const number=questionNumber[0].number;
    const { title, difficulty, description, editorial, questiontype, testCases } = req.body;

    // 1. Create Problem
    const problem = await Problem.create(
      [
        {
          questionNumber: number,
          title,
          difficulty,
          description,
          editorial,
          questiontype,
        
        },
      ]
     // { session }
    );

    const createdProblem = problem[0];

    // 2. Attach problemId to test cases
    const testCaseDocs = testCases.map((tc: any) => ({
      input: tc.input,
      output: tc.output,
      explanation: tc.explanation,
      problemId: createdProblem._id,
    }));

    // 3. Insert test cases
    await TestCase.insertMany(testCaseDocs, 
     // { session }
    );

    // 4. Commit transaction
   // await session.commitTransaction();
    //session.endSession();
    await QuestionNumber.findByIdAndUpdate(questionNumber[0]._id, { $inc: { number: 1 } }); 
    return res.status(201).json({
      message: "Problem created successfully",
      problem: createdProblem,

    });
  } catch (error) {
    // rollback if anything fails
   // await session.abortTransaction();
   // session.endSession();
   console.log(error);

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

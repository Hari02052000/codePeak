import { Request, Response } from "express";
import Problem from "../Models/ProblemModel";
import TestCase from "../Models/TestModel";
import QuestionNumber from "../Models/QuestionNumber";

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
  try {
let questionNumber= await QuestionNumber.find();
if(questionNumber.length===0){
  await QuestionNumber.create({number:1});
  questionNumber= await QuestionNumber.find();
}
const number=questionNumber[0].number;
    const { title, difficulty, description, editorial, dataStructureType, testCases } = req.body;

    const problem = await Problem.create(
        {
          questionNumber: number,
          title,
          difficulty,
          description,
          editorial,
          dataStructureType,
        
        },
          );

    // 2. Attach problemId to test cases
    const testCaseDocs =
      testCases?.map((tc: any) => ({
        input: tc.input,
        output: tc.output,
        explanation: tc.explanation,
        problemId: problem._id,
      })) || [];
    await TestCase.insertMany(testCaseDocs, 
    );
    await QuestionNumber.findByIdAndUpdate(questionNumber[0]._id, { $inc: { number: 1 } }); 
    return res.status(201).json({
      message: "Problem created successfully",
      problem
    });
  } catch (error) {
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

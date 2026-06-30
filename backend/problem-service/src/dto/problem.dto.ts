import { ProblemType } from "../entities/types/problem.type";
import { testcasetype } from "../entities/types/testcase";

export type CreateProblemDto = Omit<ProblemType, "id" | "questionNumber"> & { testCases: Omit<testcasetype, "id" | "problemId">[] };
import { ProblemType } from "../entities/types/problem.type";
import { testcasetype } from "../entities/types/testcase";

export type CreateProblemDto = Omit<ProblemType, "id" | "questionNumber"> & { testCases: Omit<testcasetype, "id" | "problemId">[] };

export type GetSingleProblemResponseDTO = ProblemType & {
    testCases : testcasetype[]
}

export type GetProblemDto = {
    difficulty?: string, 
    questiontype?: string,
    search?: string, 
    page: number, 
    limit: number
}
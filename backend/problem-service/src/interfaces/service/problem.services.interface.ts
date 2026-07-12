
import { CreateProblemDto, GetProblemDto, GetSingleProblemResponseDTO } from "../../dto/problem.dto";
import { TestCase } from "../../entities/test.case";
import {ProblemType } from "../../entities/types/problem.type";
import { UserRole } from "../../entities/types/userRoleEntity";

export interface ProblemServiceinterface {
  createProblem: (createProblemDto: CreateProblemDto,UserRole: UserRole,testcases: TestCase[]) => Promise<ProblemType>;
  getProblemById: (id: string) => Promise<GetSingleProblemResponseDTO| null>;
  getAllProblems: (getProblemDto:GetProblemDto) => Promise<ProblemType[]>;
  updateProblem: (id: string, problem: Partial<ProblemType>,UserRole: UserRole) => Promise<ProblemType    | null>;
  deleteProblem: (id: string,UserRole: UserRole) => Promise<boolean>;
}
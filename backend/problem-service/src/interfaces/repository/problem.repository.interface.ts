import { Problem } from "../../entities/problem";
export interface ProblemRepositoryInterface {
  create(problem: Problem): Promise<Problem>;
  findById(id: string): Promise<Problem | null>;
  findAll(): Promise<Problem[]>;
  update(id: string, problem: Problem): Promise<Problem | null>;
  delete(id: string): Promise<Problem | null>;
}
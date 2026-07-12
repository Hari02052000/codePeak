import { Problem } from "../../entities/problem";
export interface ProblemRepositoryInterface {
  create(problem: Problem): Promise<Problem>;
  findById(id: string): Promise<Problem | null>;
  findByTitle(title:string): Promise<Problem | null>;
  findAll(difficulty?: string,questiontype?: string,search?: string,skip?: number,limit?: number): Promise<Problem[]>;
  update(problem: Problem): Promise<Problem | null>;
  delete(id: string): Promise<Problem | null>;
}
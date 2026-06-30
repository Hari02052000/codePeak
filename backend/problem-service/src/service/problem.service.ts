import { ProblemType } from "../entities/types/problem.type";
import{Problem} from "../entities/problem";
import { UserRole } from "../entities/types/userRoleEntity";
import { ProblemRepositoryInterface } from "../interfaces/repository/problem.repository.interface";
import { TestCaseRepositoryInterface } from "../interfaces/repository/testcase.repository.interface";
import { ProblemServiceinterface } from "../interfaces/service/problem.services.interface";
import { ProblemUtilsInterface } from "../interfaces/utils/problem.utils.interface";
import { TestCase } from "../entities/test.case";
import { CreateProblemDto } from "../dto/problem.dto";

export class Problemservice implements ProblemServiceinterface {
    constructor( private problemRepository: ProblemRepositoryInterface,private testCaseRepository: TestCaseRepositoryInterface,private problemutils:ProblemUtilsInterface) {}
    async createProblem(createProblemDto: CreateProblemDto, UserRole: UserRole): Promise<ProblemType> {
        if (UserRole !== "admin") {
            throw new Error("Unauthorized: Only admin can create problems.");
        }
     const questionNumber = await this.problemutils.getquestionnumber();
     const { title, difficulty, description, editorial, questiontype, testCases } = createProblemDto;

     const problemEntity = Problem.create({
     title,
     difficulty,
     description,
     editorial,
     questionNumber,
     questiontype
     })
     const problem = await this.problemRepository.create(problemEntity);
     const testCaseEntities = testCases.map(testCase => TestCase.create({ ...testCase, problemId: problem.getProps().id }));
     await this.testCaseRepository.saveTestCases(testCaseEntities);
    const isUpdated = await this.problemutils.incrementquestionnumber();
    if(!isUpdated) throw new Error("Failed to increment question number.");
    return problem.getProps();
    }
    getProblemById(id: string): Promise<ProblemType | null> {
        throw new Error("Method not implemented.");
    }
    getAllProblems(difficulty?: string, questiontype?: string, search?: string, skip?: number, limit?: number): Promise<ProblemType[]> {
        throw new Error("Method not implemented.");
    }
    updateProblem(id: string, problem: Partial<ProblemType>, UserRole: UserRole): Promise<ProblemType | null> {
        throw new Error("Method not implemented.");
    }
    deleteProblem(id: string, UserRole: UserRole): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

  
  
import { ProblemType } from "../entities/types/problem.type";
import{Problem} from "../entities/problem";
import { UserRole } from "../entities/types/userRoleEntity";
import { ProblemRepositoryInterface } from "../interfaces/repository/problem.repository.interface";
import { TestCaseRepositoryInterface } from "../interfaces/repository/testcase.repository.interface";
import { ProblemServiceinterface } from "../interfaces/service/problem.services.interface";
import { ProblemUtilsInterface } from "../interfaces/utils/problem.utils.interface";
import { TestCase } from "../entities/test.case";
import { CreateProblemDto, GetProblemDto, GetSingleProblemResponseDTO } from "../dto/problem.dto";
import { ValidationError,UnauthorizedError,InternalServerError, ForbiddenError, ConflictError } from "../errors/error";

export class Problemservice implements ProblemServiceinterface {
    constructor( private problemRepository: ProblemRepositoryInterface,private testCaseRepository: TestCaseRepositoryInterface,private problemutils:ProblemUtilsInterface) {}
    async createProblem(createProblemDto: CreateProblemDto, UserRole: UserRole): Promise<ProblemType> {
        if (UserRole !== "admin") {
            throw new UnauthorizedError("Unauthorized: Only admin can create problems.");
        }
     const questionNumber = await this.problemutils.getquestionnumber();
     const { title, difficulty, description, editorial, questiontype, testCases } = createProblemDto;
     const savedTitle = await this.problemRepository.findByTitle(title)
     if(savedTitle) throw new ConflictError("title allready exist")
     const problemEntity = Problem.create({
     title,
     difficulty,
     description,
     editorial,
     questionNumber,
     questiontype
     })
     const problem = await this.problemRepository.create(problemEntity);
     const testCaseEntities = testCases.map(testCase => TestCase.create({ ...testCase, problemId: problem.getProps.id }));
     await this.testCaseRepository.saveTestCases(testCaseEntities);
    const isUpdated = await this.problemutils.incrementquestionnumber();
    if(!isUpdated) throw new InternalServerError("Failed to increment question number.");
    return problem.getProps;
    }
    async getProblemById(id: string): Promise<GetSingleProblemResponseDTO | null> {
        const problem = await this.problemRepository.findById(id)
        if(problem) {
         const problemId = problem.getProps.id
         const testCases = await this.testCaseRepository.getThreeTestCases(problemId)
            return {...problem.getProps,testCases:testCases.map((t)=>t.getProps)}
        }
        return null
    }
   async getAllProblems(getProblemDto:GetProblemDto): Promise<ProblemType[]> {
        const { limit,page,difficulty,questiontype,search } = getProblemDto
        const skip = (page - 1) * limit
        const problems = await this.problemRepository.findAll(difficulty,questiontype,search,skip,limit)
        return problems.map((problem)=>problem.getProps)
    }
    async updateProblem(id: string, problem: Partial<ProblemType>, UserRole: UserRole): Promise<ProblemType | null> {
       if (UserRole !== "admin") {
        throw new UnauthorizedError("Unauthorized: Only admin can create problems.");
       }
     const savedProblem = await this.problemRepository.findById(id)
     if(!savedProblem) throw new ForbiddenError("problem not found, invalid problem id")
      if(problem.description) savedProblem.setDescription(problem.description)
      if(problem.difficulty) savedProblem.setDifficulty(problem.difficulty)
      if(problem.editorial) savedProblem.setEditorial(problem.editorial)
      if(problem.questiontype) savedProblem.setQuestionType(problem.questiontype)
      if(problem.title){
        const savedTitle = await this.problemRepository.findByTitle(problem.title)
        if(savedTitle) throw new ConflictError("title already exist")
        savedProblem.setTitle(problem.title)
      }
      const updatedProblem = await this.problemRepository.update(savedProblem)
      if(updatedProblem) return updatedProblem.getProps
      throw new InternalServerError("updation failed,try again")
    }
    async deleteProblem(id: string, UserRole: UserRole): Promise<boolean> {
      if (UserRole !== "admin") {
        throw new UnauthorizedError("Unauthorized: Only admin can delete problems.");
       }
     const savedProblem = await this.problemRepository.findById(id)
     if(!savedProblem) throw new ForbiddenError("problem not found, invalid id")
     const deletedProblem = await this.problemRepository.delete(savedProblem.getProps.id)
     if(deletedProblem){ 
        const isDelete = await this.testCaseRepository.deleteTestCasesByProblemId(deletedProblem.getProps.id)
        if(isDelete) return true
     }
     return false
    }
}

  
  
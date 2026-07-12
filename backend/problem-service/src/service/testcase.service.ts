import { testcasetype } from "../entities/types/testcase";
import { TestcaseServiceinterface } from "../interfaces/service/testcase.services.interface";
import { TestCaseRepositoryInterface } from "../interfaces/repository/testcase.repository.interface";
import { TestCase } from "../entities/test.case";
import { UserRole } from "../entities/types/userRoleEntity";
import { ProblemRepositoryInterface } from "../interfaces/repository/problem.repository.interface";


export class TestcaseService implements TestcaseServiceinterface {

    constructor(private testCaseRepository: TestCaseRepositoryInterface, private problemRepository: ProblemRepositoryInterface) {}

    async createTestCase(testcase: Omit<testcasetype, "id">,UserRole: UserRole): Promise<testcasetype> {
        if (UserRole !== "admin") {
            throw new Error("Only admins can create test cases.");
        }
        const problem = await this.problemRepository.findById(testcase.problemId);
        if (!problem) {
            throw new Error("Problem not found.");
        }
        
        
        const testCaseEntity = TestCase.create(testcase);
        const createdTestCase = await this.testCaseRepository.create(testCaseEntity);
        return createdTestCase.getProps;
    
    
    }
    getTestCasesByProblemId(problemId: string): Promise<testcasetype[]> {
        throw new Error("Method not implemented.");
    }
    getTestCaseById(id: string): Promise<testcasetype | null> {
        throw new Error("Method not implemented.");
    }
    updateTestCase(id: string, testcase: Partial<testcasetype>,UserRole: UserRole): Promise<testcasetype | null> {
        if (UserRole !== "admin") {
            throw new Error("Only admins can create test cases.");
        }
        throw new Error("Method not implemented.");
    }       
    deleteTestCase(id: string,UserRole: UserRole): Promise<boolean> {
        if (UserRole !== "admin") {
            throw new Error("Only admins can create test cases.");
        }
        throw new Error("Method not implemented.");
    }

}
import { testcasetype } from "../entities/types/testcase";
import { TestcaseServiceinterface } from "../interfaces/service/testcase.services.interface";

export class TestcaseService implements TestcaseServiceinterface {
    createTestCase(testcase: Omit<testcasetype, "id">): Promise<testcasetype> {
        throw new Error("Method not implemented.");
    }
    getTestCasesByProblemId(problemId: string): Promise<testcasetype[]> {
        throw new Error("Method not implemented.");
    }
    getTestCaseById(id: string): Promise<testcasetype | null> {
        throw new Error("Method not implemented.");
    }
    updateTestCase(id: string, testcase: Partial<testcasetype>): Promise<testcasetype | null> {
        throw new Error("Method not implemented.");
    }       
    deleteTestCase(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}
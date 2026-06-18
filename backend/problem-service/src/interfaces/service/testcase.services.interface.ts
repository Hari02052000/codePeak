import { TestCase } from "../../entities/test.case";
import { testcasetype } from "../../entities/types/testcase";

export interface TestcaseServiceinterface {
  createTestCase: (testcase: Omit<testcasetype, "id">) => Promise<testcasetype>;
  getTestCasesByProblemId: (problemId: string) => Promise<testcasetype[]>;
  getTestCaseById: (id: string) => Promise<testcasetype | null>;
  updateTestCase: (id: string, testcase: Partial<testcasetype>) => Promise<testcasetype  | null>;
  deleteTestCase: (id: string) => Promise<boolean>;
}
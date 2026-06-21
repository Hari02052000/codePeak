import { TestCase } from "../../entities/test.case";
import { testcasetype } from "../../entities/types/testcase";
import { UserRole } from "../../entities/types/userRoleEntity";

export interface TestcaseServiceinterface {
  createTestCase: (testcase: Omit<testcasetype, "id">,UserRole: UserRole) => Promise<testcasetype>;
  getTestCasesByProblemId: (problemId: string) => Promise<testcasetype[]>;
  getTestCaseById: (id: string) => Promise<testcasetype | null>;
  updateTestCase: (id: string, testcase: Partial<testcasetype>,UserRole: UserRole) => Promise<testcasetype  | null>;
  deleteTestCase: (id: string,UserRole: UserRole) => Promise<boolean>;
}
import { TestCase } from "../../entities/test.case";
export interface TestCaseRepositoryInterface {
  create(testCase:TestCase): Promise<TestCase>;
  saveTestCases(testCases: TestCase[]): Promise<TestCase[]>;
  getThreeTestCases(problemId:string):Promise<TestCase[]>
  findById(id: string): Promise<TestCase | null>;
  findAll(): Promise<TestCase[]>;
  update(id: string, testCase: TestCase): Promise<TestCase | null>;
  delete(id: string): Promise<TestCase | null>;
  deleteTestCasesByProblemId(problemId:string):Promise<boolean>
}
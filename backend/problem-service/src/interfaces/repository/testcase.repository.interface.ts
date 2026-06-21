import { TestCase } from "../../entities/test.case";
export interface TestCaseRepositoryInterface {
  create(testCase:TestCase): Promise<TestCase>;
  findById(id: string): Promise<TestCase | null>;
  findAll(): Promise<TestCase[]>;
  update(id: string, testCase: TestCase): Promise<TestCase | null>;
  delete(id: string): Promise<TestCase | null>;
}
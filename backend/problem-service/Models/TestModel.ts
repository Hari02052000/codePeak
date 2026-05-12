

import mongoose, { Schema, Document } from "mongoose";

export interface ITestCase extends Document {
  input: string;
  output: string;
  explanation?: string;
}

const TestCaseSchema = new Schema<ITestCase>({
  input: {
    type: String,
    required: true,
  },

  output: {
    type: String,
    required: true,
  },

  explanation: {
    type: String,
  },
});

export default mongoose.model<ITestCase>(
  "TestCase",
  TestCaseSchema
);
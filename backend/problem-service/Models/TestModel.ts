import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITestCase extends Document {
  input: string;
  output: string;
  explanation?: string;
  questionId: Types.ObjectId; 
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


  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question",      
    required: true,       
  },
});

export default mongoose.model<ITestCase>("TestCase", TestCaseSchema);
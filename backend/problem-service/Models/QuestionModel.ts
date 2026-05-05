import mongoose, { Schema, Document } from "mongoose";


export interface IQuestion extends Document {
  items: {
    Title: string;
    Difficulty: string;
    Editorial: string;
    Testcases: {
      Input: string;
      Output: string;
      Explanation: string;
    }[];
  }[];
}


const QuestionSchema = new Schema<IQuestion>({
  items: [
    {
      Title: { type: String, required: true },
      Difficulty: { type: String, required: true },
      Editorial: { type: String, required: true },
      Testcases: [
        {
          Input: { type: String, required: true },
          Output: { type: String, required: true },
          Explanation: { type: String, required: true }
        }
      ]
    }
  ]
});


const Question = mongoose.model<IQuestion>("Question", QuestionSchema);

export default Question;
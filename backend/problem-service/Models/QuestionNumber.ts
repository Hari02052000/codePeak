import mongoose, { Schema, Document, Types } from "mongoose";

export interface IQuestionNumber extends Document {
  number: number;
   
}

const QuestionNumberSchema = new Schema<IQuestionNumber>({
  number: {
    type: Number,
    required: true,
    default: 1,
  },
  
});

export default mongoose.model<IQuestionNumber>("QuestionNumber", QuestionNumberSchema);
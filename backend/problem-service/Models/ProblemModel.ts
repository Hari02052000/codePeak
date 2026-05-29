

import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProblem extends Document {
  questionNumber: number;
  title: string;
  difficulty: string;
  description: string;
  editorial: string;
questiontype: string;
  
}

const ProblemSchema = new Schema<IProblem>({
   questionNumber: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  editorial: {
    type: String,
    required: true,
  },
  
  questiontype: {
    type: String,
    required: true,
  },


});

export default mongoose.model<IProblem>(
  "Problem",
  ProblemSchema
);
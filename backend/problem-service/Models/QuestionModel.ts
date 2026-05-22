

import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProblem extends Document {
  title: string;
  difficulty: string;
  description: string;
  editorial: string;
  

  testcases: Types.ObjectId[];
}

const ProblemSchema = new Schema<IProblem>({
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

  testcases: [
    {
      type: Schema.Types.ObjectId,
      ref: "TestCase",
    },
  ],
});

export default mongoose.model<IProblem>(
  "Problem",
  ProblemSchema
);
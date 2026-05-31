

import mongoose, { Schema, Document, Types } from "mongoose";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export enum DataStructureType {
  ARRAY = "array",
  STRING = "string",
  LINKED_LIST = "linked_list",
  TREE = "tree",
  GRAPH = "graph",
  MATRIX = "matrix",
  HASH_TABLE = "hash_table",
  STACK = "stack",
  QUEUE = "queue",
  HEAP = "heap",
}


export interface IProblem extends Document {
  questionNumber: number;
  title: string;
  difficulty: Difficulty;
  description: string;
  editorial: string;
 dataStructureType: DataStructureType;  
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
    enum : Object.values(Difficulty),
    required: true,
  },

  dataStructureType: {
    type: String,
    enum: Object.values(DataStructureType),
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  editorial: {
    type: String,
    required: true,
  }
});

export default mongoose.model<IProblem>(
  "Problem",
  ProblemSchema
);
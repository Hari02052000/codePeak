
import express from "express";
import {getProblems, createProblem, deleteProblemById, getProblemById,    
} from "../Controllers/problemcontroller";    

const router = express.Router();

router.post("/", createProblem);
router.get("/", getProblems); 
router.get("/:id", getProblemById);

export default router;
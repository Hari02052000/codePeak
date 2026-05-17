

import express from "express";
import {
  createProblem,
  updateProblem,
  getProblem,
  getProblembyId
} from "../Controllers/problemcontroller";

const router = express.Router();

router.post("/", createProblem);

router.put("/:id", updateProblem);
router.get("/problems", getProblem);
router.get("/problems/:id", getProblembyId);

export default router;
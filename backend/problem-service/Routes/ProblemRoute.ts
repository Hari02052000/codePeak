import express from "express";

import {getProblems,createProblem,deleteProblemById,getProblemById,} from "../Controllers/problemcontroller";

import { createProblemValidation,problemIdValidation,} from "../validations/problemValidation";

import { validate } from "../middleware/validationMiddleware";

const router = express.Router();

router.post(
  "/",
  createProblemValidation,
  validate,
  createProblem
);

router.get("/", getProblems);

router.get(
  "/:id",
  problemIdValidation,
  validate,
  getProblemById
);

router.delete(
  "/:id",
  problemIdValidation,
  validate,
  deleteProblemById
);

export default router;
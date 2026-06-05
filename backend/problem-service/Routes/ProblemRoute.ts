import { Router } from "express";

import {getProblems,createProblem,deleteProblemById,getProblemById,} from "../Controllers/problemcontroller";

import { createProblemValidation,problemIdValidation,} from "../validations/problemValidation";

import { validate } from "../middleware/validationMiddleware";

const ProblemRouter = Router();

ProblemRouter.post(
  "/",
  createProblemValidation,
  validate,
  createProblem
);

ProblemRouter.get("/", getProblems);

ProblemRouter.get(
  "/:id",
  problemIdValidation,
  validate,
  getProblemById
);

ProblemRouter.delete(
  "/:id",
  problemIdValidation,
  validate,
  deleteProblemById
);

export default ProblemRouter;
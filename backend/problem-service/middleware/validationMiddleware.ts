import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ValidationError } from "../utills/error";

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
   const fieldErrors: Record<string, string> = {};
    result.array().forEach((error) => {
      if(error.type === "field"){
        fieldErrors[error.path] = error.msg;
        return;
      }
      else{
        fieldErrors[error.type] = error.msg;
        return;
      }
    });
    return next(new ValidationError("Invalid request data", fieldErrors));
  }

  next();
};
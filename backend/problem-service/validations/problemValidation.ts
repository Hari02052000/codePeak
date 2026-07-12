import { body, param } from "express-validator";

export const createProblemValidation = [
 
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be between 5 and 100 characters"),

  
  body("difficulty")
    .trim()
    .notEmpty()
    .withMessage("Difficulty is required")
    .isIn(["easy", "medium", "hard"])
    .withMessage(
      "Difficulty must be easy, medium or hard"
    ),

  
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage(
      "Description must contain at least 10 characters"
    ),

  
  body("editorial")
    .trim()
    .notEmpty()
    .withMessage("Editorial is required")
    .isLength({ min: 10 })
    .withMessage(
      "Editorial must contain at least 10 characters"
    ),

  
  body("testCases")
    .isArray({ min: 1 })
    .withMessage(
      "At least one test case is required"
    ),

  
  body("testCases.*.input")
    .trim()
    .notEmpty()
    .withMessage("Input is required"),

  
  body("testCases.*.output")
    .trim()
    .notEmpty()
    .withMessage("Output is required"),

  
  body("testCases.*.explanation")
    .optional()
    .isString()
    .withMessage(
      "Explanation must be string"
    ),
];

export const problemIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Problem ID"),
];
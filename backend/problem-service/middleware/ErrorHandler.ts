import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../utills/error';
export const handleError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof BaseError) {
    console.warn(error);
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.name,
        message: error.message,
        details: error.details,
      },
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
    },
  });
};


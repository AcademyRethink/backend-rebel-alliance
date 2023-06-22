import { Request, Response } from "express";
import { ErrorType } from "../../types";

const errorHandler = (error: ErrorType, req: Request, res: Response) => {
  const status = error.status ? error.status : 500;
  const errorResponse = {
    message: error.message ? error.message : "Internal server Error",
    stack: error.stack,
  };

  res.status(status).json(errorResponse);
};

const makeError = ({ message, status }: ErrorType) => {
  return {
    message,
    status,
  };
};
export { errorHandler, makeError };

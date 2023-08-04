import { NextFunction, Request, Response } from 'express';
import { CustomApiError } from '../errors/customError.js';
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // CUSTOM ERROR
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  // NOT CUSTOM ERROR
  return res
    .status(500)
    .json({ msg: 'Something went wrong - try again later' });
};

export default errorHandler;

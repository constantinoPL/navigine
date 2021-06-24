import { Request, Response } from 'express-serve-static-core';
import { ErrorRequestHandler, NextFunction } from 'express';
import { ApiError } from './api.errors';
import { httpStatusCodes } from '../common/http.status-codes';

export const errorMiddleware: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  } else {
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Непредвиденная ошибка' });
  }
};

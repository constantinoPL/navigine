import { RequestHandler } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import { User } from '../../User/user.entity';
import { ApiError } from '../Exceptions/api.errors';

export const globalDeviceAccessMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findOne({ where: { id: req.body.userId } });
  if (!user) {
    throw ApiError.AccessDenied('User does not exist');
  }
  next();
};

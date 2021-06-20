import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log('Require Auth Middleware');
  console.log(req.currentUser);
  if(!req.currentUser) {
    throw new NotAuthorizedError('Not Authorized');
  }
  next();
};

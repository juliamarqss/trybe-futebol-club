import { NextFunction, Request, Response } from 'express';
import GeneratorError from '../GeneratorError';
import Jwt from '../Jwt';

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new GeneratorError(401, 'Token not found');
  }

  try {
    const jwt = new Jwt();
    const user = jwt.authorization(authorization);
    res.locals = user;
    next();
  } catch (error) {
    throw new GeneratorError(401, 'Token must be a valid token');
  }
};

export default tokenValidation;

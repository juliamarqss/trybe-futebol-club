import { Request, Response, NextFunction } from 'express';
import IError from '../interfaces/IError';

export default class ErrorMiddleware {
  public static statusMessage(error: IError, _req: Request, res: Response, _next: NextFunction) {
    const { status, message } = error;
    if (status) return res.status(status).json({ message });
    return res.status(500).json({ message: 'Internal Server Error!' });
  }
}

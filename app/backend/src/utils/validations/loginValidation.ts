import { NextFunction, Request, Response } from 'express';
// import ILogin from '../../interfaces/ILogin';

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

export default loginValidation;

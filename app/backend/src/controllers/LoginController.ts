import { NextFunction, Response } from 'express';
import LoginService from '../services/LoginService';
import ReqValidation from '../interfaces/ReqValidation';

export default class LoginController {
  private _loginService: LoginService;

  constructor() {
    this._loginService = new LoginService();
    this.login = this.login.bind(this);
  }

  public async login(req: ReqValidation, res: Response, next: NextFunction) {
    try {
      const token = await this._loginService.login(req.body);

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  // public async roleValidate(){}
}

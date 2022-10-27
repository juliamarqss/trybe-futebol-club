import { Response } from 'express';
import LoginService from '../services/LoginService';
import ReqValidation from '../interfaces/ReqValidation';

export default class LoginController {
  private _loginService: LoginService;

  constructor() {
    this._loginService = new LoginService();
    this.login = this.login.bind(this);
  }

  public async login(req: ReqValidation, res: Response) {
    // console.log('Req.body', req.body);

    const token = await this._loginService.login(req.body);
    return res.status(200).json({ token });
  }
}

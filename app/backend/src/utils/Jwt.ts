import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

export default class Jwt {
  private _jwtSecret: string;

  constructor() {
    this._jwtSecret = process.env.JWT_SECRET || 'JWT_SECRET';
  }

  public authentication(payload: IUser) {
    const token = sign(payload, this._jwtSecret);
    return token;
  }

  public authorization(token: string) {
    const payload = verify(token, this._jwtSecret);
    return payload;
  }
}

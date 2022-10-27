import { Request } from 'express';
import IUser from './IUser';

export default interface ReqValidation extends Request {
  user?: IUser,
}

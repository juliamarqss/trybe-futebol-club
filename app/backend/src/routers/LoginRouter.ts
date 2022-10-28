import { Router } from 'express';
import tokenValidation from '../utils/validations/tokenValidation';
import LoginController from '../controllers/LoginController';
import loginValidation from '../utils/validations/loginValidation';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/login', loginValidation, loginController.login);
loginRouter.get('/login/validate', tokenValidation, LoginController.roleValidate);

export default loginRouter;

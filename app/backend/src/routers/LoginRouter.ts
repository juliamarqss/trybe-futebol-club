import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import loginValidation from '../utils/validations/loginValidation';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/login', loginValidation, loginController.login);
// loginRouter.get('/login/validate', loginController.roleValidate);

export default loginRouter;

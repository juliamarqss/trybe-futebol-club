import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import tokenValidation from '../utils/validations/tokenValidation';
import matchValidation from '../utils/validations/matchValidation';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get('/matches', matchController.getAllMatches);
matchRouter.post('/matches', tokenValidation, matchValidation, matchController.createMatch);
matchRouter.patch('/matches/:id/finish', tokenValidation, matchController.matchFinish);
matchRouter.patch('/matches/:id', tokenValidation, matchController.matchFinish);

export default matchRouter;

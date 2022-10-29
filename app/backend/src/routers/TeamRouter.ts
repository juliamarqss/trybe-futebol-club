import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.get('/teams', teamController.getAllTeams);
teamRouter.get('/teams/:id', teamController.getTeam);

export default teamRouter;

import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();
const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/leaderboard/home', leaderboardController.getLeaderHome);

export default leaderboardRouter;

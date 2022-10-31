import { NextFunction, Response, Request } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  private _leaderboardService: LeaderboardService;

  constructor() {
    this._leaderboardService = new LeaderboardService();
    this.getLeaderHome = this.getLeaderHome.bind(this);
  }

  public async getLeaderHome(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderHome = await this._leaderboardService.getLeaderHome();

      return res.status(200).json(leaderHome);
    } catch (error) {
      next(error);
    }
  }
}

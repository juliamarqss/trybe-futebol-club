import { NextFunction, Response, Request } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  private _matchService: MatchService;

  constructor() {
    this._matchService = new MatchService();
    this.getAllMatches = this.getAllMatches.bind(this);
  }

  public async getAllMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this._matchService.getAllMatches();

      const { inProgress } = req.query as { inProgress: string };

      if (inProgress) {
        const filter = JSON.parse(inProgress);
        const result = await this._matchService.matchInProgress(filter);
        return res.status(200).json(result);
      }

      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}

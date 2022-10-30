import { NextFunction, Response, Request } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  private _matchService: MatchService;

  constructor() {
    this._matchService = new MatchService();
    this.getAllMatches = this.getAllMatches.bind(this);
    this.createMatch = this.createMatch.bind(this);
    this.matchFinish = this.matchFinish.bind(this);
    this.update = this.update.bind(this);
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

  public async createMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const newMatch = await this._matchService.createMatch(body);

      return res.status(201).json(newMatch);
    } catch (error) {
      next(error);
    }
  }

  public async matchFinish(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      await this._matchService.matchFinish(id);

      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { body } = req;

      await this._matchService.update(id, body);

      return res.status(200).json({ message: 'Score updated!' });
    } catch (error) {
      next(error);
    }
  }
}

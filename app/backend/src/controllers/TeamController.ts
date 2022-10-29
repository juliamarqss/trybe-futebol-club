import { NextFunction, Response, Request } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  private _teamService: TeamService;

  constructor() {
    this._teamService = new TeamService();
    this.getAllTeams = this.getAllTeams.bind(this);
    this.getTeam = this.getTeam.bind(this);
  }

  public async getAllTeams(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this._teamService.getAllTeams();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  public async getTeam(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const team = await this._teamService.getTeam(id);

      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}

import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  private _teamModel = TeamModel;

  public async getAllTeams() {
    const findTeams = await this._teamModel.findAll({ raw: true });
    return findTeams;
  }

  public async getTeam(id: number) {
    const team = await this._teamModel.findByPk(id);
    return team;
  }
}

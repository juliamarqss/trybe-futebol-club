import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import INewMatch from '../interfaces/INewMatch';
import IGoals from '../interfaces/IGoals';

export default class MatchService {
  private _matchModel = MatchModel;
  private _teamModel = TeamModel;

  public async getAllMatches() {
    const findMatches = await this._matchModel.findAll({
      include: [
        { model: this._teamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: this._teamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return findMatches;
  }

  public async matchInProgress(status: boolean) {
    const findMatches = await this._matchModel.findAll({
      where: { inProgress: status },
      include: [
        { model: this._teamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: this._teamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return findMatches;
  }

  public async createMatch(newMatch: INewMatch) {
    const payload = {
      ...newMatch,
      inProgress: true,
    };

    const create = await this._matchModel.create(payload);
    return create;
  }

  public async matchFinish(id: number): Promise<void> {
    await this._matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  public async update(id: number, scoreboard: IGoals): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = scoreboard;

    await this._matchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }
}

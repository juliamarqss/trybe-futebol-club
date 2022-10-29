import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';

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
}

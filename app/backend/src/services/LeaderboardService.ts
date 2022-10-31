import models from '../database/models';
import querySqlHome from '../utils/querySqlHome';

export default class LeaderboardService {
  public getLeaderHome = async () => {
    // https://sequelize.org/docs/v6/core-concepts/raw-queries/
    const [homeLeader] = await models.query(querySqlHome);

    return homeLeader;
  };
}

import { NextFunction, Response, Request } from 'express';
import GeneratorError from '../GeneratorError';
import TeamModel from '../../database/models/TeamModel';

const matchValidation = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { homeTeam, awayTeam } = req.body;

    const hasHomeTeam = await TeamModel.findOne({ where: { id: homeTeam } });

    const hasAwayTeam = await TeamModel.findOne({ where: { id: awayTeam } });

    if (homeTeam === awayTeam) {
      throw new GeneratorError(422, 'It is not possible to create a match with two equal teams');
    }
    console.log('Aqui');

    if (!hasAwayTeam || !hasHomeTeam) {
      throw new GeneratorError(404, 'There is no team with such id!');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default matchValidation;

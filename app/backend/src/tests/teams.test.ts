import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
// import { Response } from 'superagent';
import { teams, idTeam } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint "/teams', () => {
  describe('GET /teams', () => {
    before(async () => {
      sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[]);
    });

    after(() => {
      (TeamModel.findAll as sinon.SinonStub).restore();
    });

    it('Testa se retorna todos os times', async () => {
      const response = await chai.request(app).get('/teams');

      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.deep.equal(teams);
    });
  })

  describe('GET /teams/:id', () => {
    before(async () => {
      sinon.stub(TeamModel, 'findByPk').resolves(idTeam as TeamModel);
    });

    after(() => {
      (TeamModel.findByPk as sinon.SinonStub).restore();
    });

    it('Testa se retorna apenas um time', async () => {
      const response = await chai.request(app).get('/teams/2').send();

      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.deep.equal(idTeam);
    });
  })

});

import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
// import { Response } from 'superagent';
import { matches, inProgress } from './mocks/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint "/matches"', () => {
  describe('GET /matches', () => {
    before(async () => {
      sinon.stub(MatchModel, 'findAll').resolves(matches as unknown as MatchModel[]);
    });

    after(() => {
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it('Testa se retorna todas as partidas', async () => {
      const response = await chai.request(app).get('/matches');

      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.deep.equal(matches);
    });
  })

  describe('/matches?inProgress=true', () => {
    before(async () => {
      sinon.stub(MatchModel, "findAll").resolves(inProgress as unknown as MatchModel[])
    })
    after(()=>{
      (MatchModel.findAll as sinon.SinonStub).restore();
    })

    it('Testa se retorna todas as partidas em andamento', async () => {
      const response = await chai.request(app).get('/matches?inProgress=true');

      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.deep.equal(inProgress);
    })
  })

  describe('/matches?inProgress=false', () => {
    before(async () => {
      sinon.stub(MatchModel, "findAll").resolves(inProgress as unknown as MatchModel[])
    })
    after(()=>{
      (MatchModel.findAll as sinon.SinonStub).restore();
    })

    it('Testa se retorna todas as partidas em andamento', async () => {
      const response = await chai.request(app).get('/matches?inProgress=true');

      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.deep.equal(matches);
    })
  })
});

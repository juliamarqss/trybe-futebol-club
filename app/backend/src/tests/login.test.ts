import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';
// import { Response } from 'superagent';
import { user, login, loginInvalid, role, token } from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint "/login', () => {
  describe('POST /login', () => {
    before(async () => {
      sinon.stub(UserModel, 'findOne').resolves(user as UserModel);
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    it('Testa se o cadastro é realizado com sucesso', async () => {
      const response = await chai.request(app).post('/login').send(login);
      
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('token');
    });

    it('Testa se não é possível cadastar sem email', async () => {
      const response = await chai.request(app).post('/login').send({...user, email: ''});

      const { status } = response;

      expect(status).to.equal(400);
    })

    it('Testa se não é possível cadastar sem senha', async () => {
      const response = await chai.request(app).post('/login').send({...user, password: ''});

      const { status } = response;

      expect(status).to.equal(400);
    })

    it('Testa se não é possível cadastar com email e senha inválida', async () => {
      const response = await chai.request(app).post('/login').send(loginInvalid);

      const { status } = response;

      expect(status).to.equal(401);
    })
  })

  describe('GET /login/validate', () => {
    before(async () => {
      sinon.stub(UserModel, 'findOne').resolves(role as UserModel);
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });


    it('Testa se retorna o role do usuário corretamente', async () => {
      const response = await chai.request(app).get('/login/validate').set('authorization', token);

      const { status, body } = response;

      expect(status).to.be.equal(200);
      expect(body).to.have.property('role');
    })

    it('Testa se retorna mensagem quando o token é inválido', async () => {
      const response = await chai.request(app).get('/login/validate').set('authorization', 'invalid_token');

      const { status, body } = response;

      expect(status).to.be.equal(401);
      expect(body).to.have.property('message');
    })

    it('Testa se retorna mensagem quando o token está vazio', async () => {
      const response = await chai.request(app).get('/login/validate');

      const { status, body } = response;

      expect(status).to.be.equal(401);
      expect(body).to.have.property('message');
    })
  })
});

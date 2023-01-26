const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { allSales } = require('./mocks/salesController.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes de unidade de vendas da camada Controller', function () {

  afterEach(function () {
    sinon.restore();
  });

  describe('Listando os produtos', function () {
    it('Deve retornar o status 200 e a lista de produtos', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'getAllSales')
        .resolves(allSales);

      // act
      await salesController.getAllSales(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });
  });

  describe('Buscando um produto pelo ID', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {};
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'getSalesById')
        .resolves(allSales);

      // Act
      await salesController.getSalesById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });
  });

  it('ao passar um id inválido deve retornar um erro', async function () {
    // Arrange
    const res = {};
    const req = {
      params: { id: 999 }, // passamos aqui um id inválido para forçar o erro esperado
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    // Definimos o dublê do service retornando o contrato definido.
    sinon
      .stub(salesService, 'getsalesById')
      .resolves({
        error: { status: 404, message: 'Sale not found' },
      });

    // Act
    await salesController.getsalesById(req, res);

    // Assert
    // Avaliamos se chamou `res.status` com o valor 404
    expect(res.status).to.have.been.calledWith(404);
    // Avaliamos se chamou `res.status` com a mensagem esperada
    // expect(res.json).to.have.been.calledWith({ message: 'Sale not found' },);
  });
});

const sinon = require('sinon');
const { expect } = require('chai');
const { salesModel, connection } = require('../../../src/models');
const { allSales } = require('./mocks/salesModels.mock');

describe('Testes de unidade de vendas da camada Model', function () {

  afterEach(function () {
    sinon.restore();
  });

  describe('Listar todas as vendas', function () {

    it('deve retornar todas as vendas', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([allSales]);
      // Act
      const result = await salesModel.getAllSales();
      // Assert
      expect(result).to.be.deep.equal(allSales);
    });
  });

  describe('Listar produto pelo ID', function () {
    it('deve retornar o produto requirido pelo ID', async function () {
      sinon.stub(connection, 'execute').resolves([allSales[0]]);

      const result = await salesModel.getSalesById(1);

      expect(result).to.be.deep.equal(allSales[0]);
    })
  });
});


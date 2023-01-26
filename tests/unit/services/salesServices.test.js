const sinon = require('sinon');
const { expect } = require('chai');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const allSales = require('./mock/salesService.mock');


describe('Testes de unidade de vendas da camada Service', function () {

  afterEach(function () {
    sinon.restore();
  });

  describe('listagem de vendas', function () {
    it('retorna a lista completa de vendas', async function () {
      // arrange
      sinon.stub(salesModel, 'getAllSales').resolves(allSales);

      // act
      const result = await salesService.getAllSales();

      // assert
      expect(result).to.deep.equal(allSales);
    });
  });

  describe('busca de uma venda pelo ID', function () {
    it('retorna um erro caso a venda não exista', async function () {
      // arrange
      sinon.stub(salesModel, 'getSalesById').resolves(undefined);

      // act
      const result = await salesService.getSalesById('aaa');

      // assert
      expect(result.error.message).to.be.equal('Sales not found');
    });
  });

});


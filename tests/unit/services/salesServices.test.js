const sinon = require('sinon');
const { expect } = require('chai');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const allSales = require('./mock/salesService.mock');


describe('Testes de unidade da camada Service', function () {

  afterEach(function () {
    sinon.restore();
  });

  describe('listagem de vendas', function () {
    it('retorna a lista completa de vendas', async function () {
      // arrange
      sinon.stub(salesModel, 'getAllSales').resolves(allSales);

      // act
      const result = await saleService.getAllSales();

      // assert
      expect(result).to.deep.equal(allSales);
    });
  });

  describe('busca de uma venda pelo ID', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

      // act
      const result = await salesService.getSalesById(999);

      // assert
      expect(result.message).to.equal('Sales not found');
    });

    it('retorna um erro caso a venda não exista', async function () {
      // arrange
      sinon.stub(salesModel, 'getSalesById').resolves(undefined);

      // act
      const result = await saleService.getProductsById('aaa');

      // assert
      expect(result.message).to.equal('Sales not found');
    });

    it('retorna o produto caso ID existente', async function () {
      // arrange
      sinon.stub(salesModel, 'getProductsById').resolves([allSales[0]]);

      // act
      const result = await saleService.getProductsById(1);

      // assert
      expect(res.json).to.have.been.calledWith(allSales[0]);
    });
  });

});


const sinon = require('sinon');
const { expect } = require('chai');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsMock, oneProductMock } = require('./mock/productsServices.mock');


describe('Testes de unidade da camada Service', function () {

  afterEach(function () {
    sinon.restore();
  });

  describe('listagem de produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(productsModel, 'getAllProducts').resolves(productsMock);

      // act
      const result = await productsService.getAllProducts();

      // assert
      expect(result).to.deep.equal(productsMock);
    });
  });

  describe('busca de um produto pelo ID', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

      // act
      const result = await productsService.getProductsById(999);

      // assert
      expect(result.message).to.equal('Product not found');
    });

    it('retorna um erro caso o produto não exista', async function () {
      // arrange
      sinon.stub(productsModel, 'getProductsById').resolves(undefined);

      // act
      const result = await await productsService.getProductsById('aaa');

      // assert
      expect(result.message).to.equal('Product not found');
    });

    it('retorna o produto caso ID existente', async function () {
      // arrange
      sinon.stub(productsModel, 'getProductsById').resolves(oneProductMock);

      // act
      const result = await productsService.getProductsById(1);

      // assert
      expect(res.json).to.have.been.calledWith(oneProductMock);
    });
  });

});


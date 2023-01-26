const sinon = require('sinon');
const { expect } = require('chai');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsMock } = require('./mock/productsServices.mock');


describe('Testes de unidade de produtos da camada Service', function () {

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
    /* it('retorna um erro caso receba um ID inválido', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

      // act
      const result = await productsService.getProductsById(999);

      // assert
      expect(result.message).to.equal('Product not found');
    }); */

    it('deve retornar uma mensagem erro caso o produto não exista', async function () {
      const productId = 21;
      // arrange
      sinon.stub(productsModel, 'getProductsById').resolves(undefined);

      // act
      const result = await productsService.getProductsById(productId);

      // assert
      // expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal("Product not found");
    });
  });

});


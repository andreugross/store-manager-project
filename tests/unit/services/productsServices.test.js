const sinon = require('sinon');
const { expect } = require('chai');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsMock, oneProductMock } = require('./mock/productsServices.mock');


describe('Testes de unidade da camada Service', () => {
  describe('listagem de produtos', () => {

    //arrange
    before(async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(productsMock);
    });

    after(async () => {
      productsModel.getAllProducts.restore();
    });

    it('retorna null caso a lista esteja vazia', async () => {
      // act
      const result = await productsService.getAllProducts();
      // assert
      expect(result.type).to.be.equal(null);
    });

    it('Retorna a lista completa de produtos', async () => {
      // act
      const result  = await productsService.getAllProducts();
      // assert
      expect(result.message).to.deep.equal(productsMock);
    });
  });

  describe('busca um produto pelo id', () => {

    // arrange
    before(async () => {
      sinon.stub(productsModel, 'getProductsById').resolves(oneProductMock);
    });

    after(async () => {
      productsModel.getProductsById.restore();
    });

    it('verifica se o retorno é um objeto', async () => {
      // act
      const result = await productsService.getProductsById(1);
      // assert
      expect(result).to.be.an('object');
    });

    it('verifica se o objeto retornado contém informações do produto buscado', async () => {
      // act
      const result = await productsService.getProductsById(1);
      // assert
      expect(result).to.be.deep.equal({ id: 1, name: "Martelo de Thor" });
    });

  });
});


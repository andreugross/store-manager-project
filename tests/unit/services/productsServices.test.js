const sinon = require('sinon');
const { expect } = require('chai');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsMock, oneProductMock } = require('./mock/productsServices.mock');


describe('Testes de unidade da camada Service', () => {
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

  describe('busca de um produto por id', function () {
    it('retorna um erro caso receba um ID inválido', async function () {

      // act
      const result = await productsService.getProductsById('la');

      // assert
      expect(result.type).to.equal(404);
      expect(result.message).to.equal('Product not found');
    });

    it('retorna o produto caso ID existe', async function () {
      // arrange
      sinon.stub(productsModel, 'getProductsById').resolves(productsMock[0]);

      // act
      const result = await passengerService.getProductsById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(productsMock[0]);
    });


  });

});


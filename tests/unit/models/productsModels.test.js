const sinon = require('sinon');
const { expect } = require('chai');
const { productsModel, connection } = require('../../../src/models');
const { productsMock } = require('./mocks/productsModels.mock');

describe('Testes de unidade da camada Model', function () {
  describe('Recuperando a lista de produtos', function () {

    it('Recuperando a lista de produtos', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([productsMock]);
      // Act
      const result = await productsModel.getAllProducts();
      // Assert
      expect(result).to.be.deep.equal(productsMock);
    });

    it('Recuperando um produto a partir do seu id', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);
      // Act
      const result = await productsModel.getProductsById(1);
      // Assert
      expect(result).to.be.deep.equal(productsMock[0]);
    });
  });
});

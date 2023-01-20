const sinon = require('sinon');
const { expect } = require('chai');
const { productsModel, connection } = require('../../../src/models');
const { productsMock } = require('./mocks/productsModels.mock');

describe('Testes de unidade da camada Model', () => {
  describe('Recuperando a lista de produtos', () => {

    // arranje
    before(async () => {
      sinon.stub(connection, 'execute').resolves([productsMock]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna um array com todos os produtos', async () => {
      // act
      const result = await productsModel.getAllProducts();
        expect(result).to.be.an('array');
    });

      it('Retorna todos os produtos', async () => {
        const response = await productsModel.getAllProducts();
        expect(response).to.be.equal(productsMock)
      });
  });

  describe('Recuperando um produto a partir do seu id', () => {

    // arranje
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[[productsMock[0]]]]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna o primeiro produto encontrado', async () => {
      const result = await productsModel.getProductsById(1);
      expect(result).to.be.deep.equal(productsMock[0])
    });
  });
});

const sinon = require('sinon');
const { expect } = require('chai');
const { productsModel, connection } = require('../../../src/models');
const { productsMock, newProduct, uptadeProduct } = require('./mocks/productsModels.mock');

describe('Testes de unidade de produtos da camada Model', function () {

  afterEach(function () {
    sinon.restore();
  });

  describe('Listar todos os produtos', function () {

    it('deve retornar todos os produtos', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([productsMock]);
      // Act
      const result = await productsModel.getAllProducts();
      // Assert
      expect(result).to.be.deep.equal(productsMock);
    });
  });

  describe('Listar produto pelo ID', function () {
    it('deve retornar o produto requirido pelo ID', async function () {
      sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);

      const result = await productsModel.getProductsById(1);

      expect(result).to.be.deep.equal(productsMock[0]);
    })
  });

  describe('criar novo produto', function () {
    it('deve retornar o ID do novo produto', async function () {

      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }])

      const result = await productsModel.createProduct(newProduct)

      expect(typeof result).to.equal('object')
    })
  });

  /* describe('Atualizar um produto', function () {
    it('deve retornar um produto atualizado', async function () {
      const productToUpdate = 4;

      sinon.stub(connection, 'execute').resolves();

      const result = await productsModel.updateProduct(uptadeProduct, productToUpdate);

      expect(result).to.be.deep.equal({ id: productToUpdate, name: uptadeProduct });
    })
  }) */
});


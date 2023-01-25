const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { productsMock, oneProductMock } = require('./mocks/productsController.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes de unidade da camada Controller', function () {

  afterEach(function () {
    sinon.restore();
  });

  describe('Listando os produtos', function () {
    it('Deve retornar o status 200 e a lista de produtos', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getAllProducts')
        .resolves(productsMock);

      // act
      await productsController.getAllProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsMock);
    });
  });

  describe('Buscando um produto pelo ID', function () {

    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {};
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getProductsById')
        .resolves(oneProductMock);

      // Act
      await productsController.getProductsById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(oneProductMock);
    });
  });

  it('ao passar um id inválido deve retornar um erro', async function () {
    // Arrange
    const res = {};
    const req = {
      params: { id: 999 }, // passamos aqui um id inválido para forçar o erro esperado
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    // Definimos o dublê do service retornando o contrato definido.
    sinon
      .stub(productsService, 'getProductsById')
      .resolves({ error: { status: 404, message: 'Product not found' },
      });

    // Act
    await productsController.getProductsById(req, res);

    // Assert
    // Avaliamos se chamou `res.status` com o valor 404
    expect(res.status).to.have.been.calledWith(404);
    // Avaliamos se chamou `res.status` com a mensagem esperada
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' },
    );
  });
});

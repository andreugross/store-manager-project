const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { productsMock, oneProductMock } = require('./mocks/productsController.mock');

const { expect } = chai;
chai.use(sinonChai);

const HTTP_STATUS_OK = 200;

describe('Testes de unidade da camada Controller', () => {
  describe('Listando os produtos', () => {
    const req = {};
    const res = {};

    // arrange
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAllProducts').resolves(productsMock);
    });

    after(async () => {
      productsService.getAllProducts.restore();
    });

    it('Deve retornar o status 200 e a lista', async () => {
      // act
      await productsController.getAllProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(HTTP_STATUS_OK);
      expect(res.json).to.have.been.calledWith(productsMock);
    });
  });

  describe('Buscando um produto pelo id', function () {
    const req = {
      params: { id: 1 },
    };
    const res = {};

    // arrange
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProductsById').resolves(oneProductMock);
    });

    after(async () => {
      productsService.getProductsById.restore();
    });


    it('deve responder com 200 e os dados do banco quando existir', async () => {
      // act
      await productsController.getProductsById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(HTTP_STATUS_OK);
      expect(res.json).to.have.been.calledWith(oneProductMock);
    });


  });
});

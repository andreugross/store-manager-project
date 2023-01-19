const sinon = require('sinon');
const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');
const { expect } = require('chai');
const HTTP_STATUS_OK = 200;

describe('Testa os retornos da função getAllProducts', () => {
  const req = {};
  const res = {};
  const products = [
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do Capitão América' },
  ];

  before(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAllProducts').resolves(products);
  });

  after(async () => {
    productsService.getAllProducts.restore();
  });

  it('testa o http status de retorno ok', async () => {
    await productsController.getAllProducts(req, res);
    expect(res.status.calledWith(HTTP_STATUS_OK)).to.be.true;
  });

  it('Retorna o método "json" com um objeto', async () => {
    await productsController.getAllProducts(req, res);
    expect(res.json.calledWith(products)).to.be.true;
  });
});

describe('Testa os retornos da função getProductsById', () => {
  const req = {};
  const res = {};
  const testProducts = [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
  ];

  before(async () => {
    req.params = {
      id: 1,
    }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getProductsById').resolves(testProducts);
  });

  after(async () => {
    productsService.getProductsById.restore();
  });

  it('testa o http status de retorno ok', async () => {
    await productsController.getProductsById(req, res);
    expect(res.status.calledWith(HTTP_STATUS_OK)).to.be.true;
  });

  it('Retorna o método "json" com um objeto', async () => {
    await productsController.getProductsById(req, res);
    expect(res.json.calledWith(testProducts)).to.be.true;
  });
});

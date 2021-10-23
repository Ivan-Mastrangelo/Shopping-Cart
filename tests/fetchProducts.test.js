const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('verifica se a função fetch foi chamada ao passar o parâmetro computador', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Ao chamar fetchProducts com o parâmetro computador, verifica se a função fetch utiliza o endpoint', () => {
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  })
  it('Testa se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const resultado = await fetchProducts('computador');
    expect(resultado).toEqual(computadorSearch);
  })
  it('Testa se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const erroEsperado = new Error('You must provide an url')
    const resultado = await fetchProducts();
    expect(resultado).toEqual(erroEsperado);
  });
});

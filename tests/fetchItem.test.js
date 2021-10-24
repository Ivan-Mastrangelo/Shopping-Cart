const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Executa função fetchItem com argumento "MLB1615760527" e testa se fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa ao chamar a função fetchItem com argumento  "MLB1615760527", se fetch utiliza o endpoint', () => {
    const endPoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });
  it('Testa se retorno da função fetchItem com argumento  "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  it('Testa ao chamar fetchItem sem argumento, se retorna um erro com a mensagem: You must provide an url', async () => {
    const erro = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(erro);
  });
});

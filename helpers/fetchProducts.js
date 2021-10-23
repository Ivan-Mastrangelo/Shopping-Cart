// Código realizado pelo professor Bernardo Salgueiro ao explicar em vídeo como a turma deve resolver os requisios do projeto, e corrigido pelo lint.

const fetchProducts = (product) => 
  // seu código aqui
   fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
  .then((data) => data.json())
  .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

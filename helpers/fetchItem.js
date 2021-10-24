const fetchItem = (id) => 
  // seu código aqui
  fetch(`https://api.mercadolibre.com/items/${id}`)
  .then((data) => data.json())
  .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

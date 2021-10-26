const saveCartItems = (items) => {
  // seu código aqui
localStorage.setItem('cartItems', JSON.stringify(items));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}

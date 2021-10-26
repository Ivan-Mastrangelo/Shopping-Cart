const olCartItems = document.querySelector('.cart__items');
const clearCartBtn = document.querySelector('.empty-cart');

function eraseItemLocalStorage(item) {
  const listElement = document.querySelectorAll('li');
  const newList = [];
  listElement.forEach((element) => {
    if (element.innerHTML !== item.innerHTML) {
      newList.push(element.innerHTML);
    }
  });
  saveCartItems(newList);
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const item = event.target;
  event.target.remove(); // Solução desenvolvida por Eduardo Miyazaki e trazida por Josue G. Ribeiro.
  eraseItemLocalStorage(item);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function prepareDataToLocalstore() {
  const listElement = document.querySelectorAll('li');
  const oldList = [];
  listElement.forEach((element) => {
    oldList.push(element.innerHTML);
    const list = JSON.stringify(oldList);
    saveCartItems(list);
  });
}

async function loadingCart(id) {
  const itemToCart = await fetchItem(id);
  const objToCart = { sku: itemToCart.id, name: itemToCart.title, salePrice: itemToCart.price };
  const itemInList = createCartItemElement(objToCart);
  olCartItems.appendChild(itemInList);
  prepareDataToLocalstore();
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const imgBtn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  imgBtn.addEventListener('click', () => { loadingCart(sku); });
  section.appendChild(imgBtn); // solução para o botão aprendida com Mabiane Polniak e Josué Gomes Ribeiro, companheiros de turma.
  return section;
}

/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

// O código abaixo, até a linha 92, foi realizado pelo professor Bernardo Salgueiro ao explicar em vídeo como a turma deve resolver os requisios do projeto:

async function returnPruducts(product) {
  const dataProduct = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  dataProduct.results.forEach((element) => {
    const itemObj = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    const productItem = createProductItemElement(itemObj);
    sectionItems.appendChild(productItem);
  }); 
}

function clearItem(fact) {
  const item = fact.target;
  fact.target.remove();
  eraseItemLocalStorage(item);
}

// A função replaceCart contou com ajudas importantes dos companheiros de turma de Mateus Turola e Brunão.

function replaceCart() {
  const storage = JSON.parse(localStorage.getItem('cartItems'));
  if (storage !== null) {
    storage.forEach((element) => {
    const li = document.createElement('li');
    li.innerText = element;
    li.className = 'cart__item';
    li.addEventListener('click', clearItem);
    olCartItems.appendChild(li);
});
}
}

window.onload = () => {
  returnPruducts('computador');
  replaceCart();
};

function clearLocalStore() {
  olCartItems.innerHTML = '';
  saveCartItems(olCartItems.innerHTML);
  // com a colaboração do companheiro de turma Josué Gomes Ribeiro.
}

clearCartBtn.addEventListener('click', clearLocalStore);
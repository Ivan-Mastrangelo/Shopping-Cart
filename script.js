function cartItemClickListener(event) {
  // coloque seu código aqui
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

async function loadingCart(id) {
  const itemToCart = await fetchItem(id);
  const objToCart = { sku: itemToCart.id, name: itemToCart.title, salePrice: itemToCart.price };
  const itemInList = createCartItemElement(objToCart);
  const olCart = document.querySelector('.cart__items');
  olCart.appendChild(itemInList);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const imgBtn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  imgBtn.addEventListener('click', () => { loadingCart(sku); });
  section.appendChild(imgBtn); // solução para o botão aprendida com Mabiane e Josué.
  return section;
}

/* function usingImgBtn() {
  let imgBtnId = document.querySelector('.item__add').parentNode.firstChild;
  const idItem = imgBtnId.innerHTML;
  //let imgBtnId = '';
  loadingCart(idItem);
} */

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// O código abaixo foi realizado pelo professor Bernardo Salgueiro ao explicar em vídeo como a turma deve resolver os requisios do projeto:

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

window.onload = () => {
  returnPruducts('computador');
};

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/storageControl.js
const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];
const addStorage = (key, obj) => {
  const data = getStorage(key);
  data.push(obj);
  localStorage.setItem(key, JSON.stringify(data));
};
const removeStorage = (key, id) => {
  const data = getStorage(key);
  data.splice(data.findIndex(item => item.id === id), 1);
  localStorage.setItem(key, JSON.stringify(data));
};
const editStorage = (key, id, field, text) => {
  const data = getStorage(key);
  const index = data.findIndex(item => item.id === id);
  data[index][field] = text;
  localStorage.setItem(key, JSON.stringify(data));
};
;// CONCATENATED MODULE: ./src/js/modules/iconCart.js

const updateIconCart = () => {
  const cart = getStorage('cart');
  const totalQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
  const cartIcon = document.querySelector('.header__link_cart');
  cartIcon.dataset.total = totalQuantity;
};
;// CONCATENATED MODULE: ./src/js/modules/menu.js

const menuBtn = document.querySelector('.header__menu-button');
const menu = document.querySelector('.menu');
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('header__menu-button_close');
  menu.classList.toggle('menu_active');
});
updateIconCart();
;// CONCATENATED MODULE: ./src/js/modules/accordion.js
const items = document.querySelectorAll('.footer__list_cover');
const buttons = document.querySelectorAll('.footer__button');
buttons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('footer__button_active');
    for (let i = 0; i < items.length; i++) {
      if (index === i) {
        items[i].classList.toggle('footer__list_active');
      }
    }
  });
});
;// CONCATENATED MODULE: ./src/js/modules/catalog.js
const getCategories = async () => {
  const result = await fetch(`https://shorthaired-veiled-fascinator.glitch.me/api/category`);
  const list = await result.json();
  return list;
};
const createFooterElement = text => {
  const li = document.createElement('li');
  li.className = 'footer__item';
  const link = document.createElement('a');
  link.className = 'footer__link';
  link.href = 'category.html?search=' + text;
  link.textContent = text;
  li.append(link);
  return li;
};
const createMenuElement = text => {
  const li = document.createElement('li');
  li.className = 'menu__item';
  const link = document.createElement('a');
  link.className = 'menu__link';
  link.href = 'category.html?search=' + text;
  link.textContent = text;
  li.append(link);
  return li;
};
const renderCategories = async () => {
  const categories = await getCategories();
  const footerList = document.querySelector('.footer__list_two-cols');
  const menuList = document.querySelector('.menu__list_two-cols');
  footerList.append(...categories.map(createFooterElement));
  menuList.append(...categories.map(createMenuElement));
};
renderCategories();
;// CONCATENATED MODULE: ./src/js/modules/calculations.js
const calculations_format = number => {
  return `${number.toFixed(2)}\xa0₽`;
};
const calculateDiscount = (price, quantity, discount) => {
  return quantity * (price * discount / 100);
};
const calculations_calculatePriceWithDiscount = (price, quantity, discount) => {
  return quantity * (price - price * discount / 100);
};
const calculatePriceWithoutDiscount = (price, quantity) => {
  return price * quantity;
};
const calculations_calculateCredit = (price, quantity) => {
  return price * quantity * 0.05;
};
;// CONCATENATED MODULE: ./src/js/modules/createElements.js

const getImageSrc = image => {
  if (image === 'image/notimage.jpg') {
    return './img/no-image.png';
  }
  return `https://shorthaired-veiled-fascinator.glitch.me/${image}`;
};
const createCard = ({
  id,
  title,
  price,
  discount,
  image
}) => {
  const li = document.createElement('li');
  li.className = 'card';
  const imgSrc = getImageSrc(image);
  li.innerHTML = `
  <a href="product.html?id=${id}" class="card__link">
    <div class="card__image-wrapper">
      <img src="${imgSrc}" alt="${title}" class="card__image" width="420" height="295">
      ${discount > 0 ? `<div class="card__discount">-${discount}%</div>` : ``}
    </div>
  
    <div class="card__price">
      <p class="card__new-price">${calculations_format(calculations_calculatePriceWithDiscount(price, 1, discount))} ₽</p>
      ${discount > 0 ? `
      <p class="card__old-price">
        <span class="visually-hidden">Старая цена</span>${price} ₽
      </p>
      ` : ``}
    </div>
  
    <p class="card__product">${title}</p>
  </a>
  `;
  return li;
};
const createCartProduct = ({
  id,
  title,
  price,
  discount,
  image
}, count) => {
  const li = document.createElement('li');
  li.className = 'composition__full-product';
  li.dataset.id = id;
  const imgSrc = getImageSrc(image);
  li.innerHTML = `
    <div class="composition__column composition__column_item">
      <input type="checkbox" class="composition__checkbox">
      <img src="${imgSrc}" alt="${title}" class="composition__product-image">

      <div class="composition__wrapper">
        <div class="composition__column composition__column_price composition__column_price_tablet">
          <div class="composition__new-price">
            ${format(calculatePriceWithDiscount(price, count, discount))}
          </div>
          ${discount > 0 ? `
          <div class="composition__old-price">
            ${(count * price).toFixed(2)}&nbsp;₽
          </div>` : ``}
          <div class="composition__credit">
            В кредит от&nbsp;${format(calculateCredit(price, count))}
          </div>
        </div>
        <h3 class="composition__product-title">${title}</h3>
      </div>
    </div>

    <div class="composition__column composition__column_counter">
      <button class="composition__count-button composition__count-button_minus">-</button>
      <p class="composition__quantity">${count}</p>
      <button class="composition__count-button composition__count-button_plus">+</button>
    </div>

    <div class="composition__column composition__column_price composition__column_price_pc">
      <div class="composition__new-price">
        ${format(calculatePriceWithDiscount(price, count, discount))}
      </div>
      ${discount > 0 ? `
      <div class="composition__old-price">
        ${(count * price).toFixed(2)}&nbsp;₽
      </div>` : ``}
      <div class="composition__credit">
        В кредит от&nbsp;${format(calculateCredit(price, count))}
      </div>
    </div>
  `;
  return li;
};
const createProductPreview = ({
  title,
  image
}) => {
  const li = document.createElement('li');
  li.className = 'composition__product';
  const img = document.createElement('img');
  img.alt = title;
  img.classList.add('composition__product-image', 'composition__product-image_small');
  const imgSrc = getImageSrc(image);
  img.src = imgSrc;
  li.append(img);
  return li;
};
;// CONCATENATED MODULE: ./src/js/modules/getGoods.js
const url = 'https://shorthaired-veiled-fascinator.glitch.me';
const getGoods = async () => {
  const result = await fetch(`${url}/api/goods`);
  const goods = await result.json();
  return goods;
};
const getProduct = async id => {
  const result = await fetch(`${url}/api/goods/${id}`);
  const product = await result.json();
  return product;
};
const getGoodsByCategory = async category => {
  const goods = await getGoods();
  const list = goods.filter(product => product.category.toLowerCase().startsWith(category.toLowerCase()));
  return list;
};
const getGoodsOnSale = async () => {
  const goods = await getGoods();
  const list = goods.filter(product => product.discount > 0);
  return list;
};
;// CONCATENATED MODULE: ./src/js/modules/categoryList.js


const placeCategoryList = async () => {
  const url = new URL(window.location.href);
  const category = url.searchParams.get('search');
  const items = await getGoodsByCategory(category);
  const container = document.querySelector('.category-goods__container');
  const title = document.createElement('h1');
  title.className = 'subtitle';
  title.textContent = category;
  const ul = document.createElement('ul');
  ul.className = 'category-goods__list';
  const allItems = items.map(createCard);
  ul.append(...allItems);
  container.append(title, ul);
};
placeCategoryList();
;// CONCATENATED MODULE: ./src/js/category.js




/******/ })()
;
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
  const result = await fetch(`http://shorthaired-veiled-fascinator.glitch.me/api/category`);
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
;// CONCATENATED MODULE: ./src/js/modules/timer.js
const timerBlock = document.querySelector('[data-timer-deadline]');
if (timerBlock) {
  const deadline = new Date(timerBlock.dataset.timerDeadline).getTime();
  timerBlock.classList.add('timer');
  timerBlock.innerHTML = `
    <p class="timer__title">До конца акции:</p>
    <div class="timer__list">
      <p class="timer__item timer__item_days">
        <span class="timer__counter timer__counter_days"></span>
        <span class="timer__units timer__units_days"></span>
      </p>
      <p class="timer__item timer__item_hours">
        <span class="timer__counter timer__counter_hours"></span>
        <span class="timer__units timer__units_hours"></span>
      </p>
      <p class="timer__item timer__item_minutes">
        <span class="timer__counter timer__counter_minutes"></span>
        <span class="timer__units timer__units_minutes"></span>
      </p>
      <p class="timer__item timer__item_seconds">
        <span class="timer__counter timer__counter_seconds"></span>
        <span class="timer__units timer__units_seconds"></span>
      </p>
    </div>
  `;
  const counterDays = timerBlock.querySelector('.timer__counter_days');
  const counterHours = timerBlock.querySelector('.timer__counter_hours');
  const counterMinutes = timerBlock.querySelector('.timer__counter_minutes');
  const counterSeconds = timerBlock.querySelector('.timer__counter_seconds');
  const unitsDays = timerBlock.querySelector('.timer__units_days');
  const unitsHours = timerBlock.querySelector('.timer__units_hours');
  const unitsMinutes = timerBlock.querySelector('.timer__units_minutes');
  const unitsSeconds = timerBlock.querySelector('.timer__units_seconds');
  const getTimeRemaining = () => {
    const currentDate = Date.now() + (180 + new Date().getTimezoneOffset()) * 60 * 1000;
    const timeRemaining = deadline - currentDate;
    const seconds = Math.floor(timeRemaining / 1000 % 60);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);
    return {
      timeRemaining,
      seconds,
      minutes,
      hours,
      days
    };
  };
  const getDeclension = (counter, type) => {
    if (counter > 10 && counter < 20) {
      if (type === 'day') {
        return 'дней';
      } else if (type === 'hours') {
        return 'часов';
      } else if (type === 'minutes') {
        return 'минут';
      } else {
        return 'секунд';
      }
    } else if (counter % 10 === 1) {
      if (type === 'day') {
        return 'день';
      } else if (type === 'hours') {
        return 'час';
      } else if (type === 'minutes') {
        return 'минута';
      } else {
        return 'секунда';
      }
    } else if (counter % 10 === 2 || counter % 10 === 3 || counter % 10 === 4) {
      if (type === 'day') {
        return 'дня';
      } else if (type === 'hours') {
        return 'часа';
      } else if (type === 'minutes') {
        return 'минуты';
      } else {
        return 'секунды';
      }
    } else {
      if (type === 'day') {
        return 'дней';
      } else if (type === 'hours') {
        return 'часов';
      } else if (type === 'minutes') {
        return 'минут';
      } else {
        return 'секунд';
      }
    }
  };
  const start = () => {
    const timer = getTimeRemaining();
    if (timer.days <= 0) {
      document.querySelector('.timer__item_days').style.display = 'none';
      document.querySelector('.timer__item_seconds').style.display = 'flex';
    }
    counterDays.textContent = timer.days;
    unitsDays.textContent = getDeclension(timer.days, 'day');
    counterHours.textContent = timer.hours > 9 ? timer.hours : '0' + timer.hours;
    unitsHours.textContent = getDeclension(timer.hours, 'hours');
    counterMinutes.textContent = timer.minutes > 9 ? timer.minutes : '0' + timer.minutes;
    unitsMinutes.textContent = getDeclension(timer.minutes, 'minutes');
    counterSeconds.textContent = timer.seconds > 9 ? timer.seconds : '0' + timer.seconds;
    unitsSeconds.textContent = getDeclension(timer.seconds, 'seconds');
    const timerId = setTimeout(start, 1000);
    if (timer.timeRemaining <= 0) {
      clearTimeout(timerId);
      timerBlock.innerHTML = '';
    }
  };
  start();
}
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
  return `http://shorthaired-veiled-fascinator.glitch.me/${image}`;
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
const createProductWrapper = ({
  title,
  price,
  discount,
  image
}) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'product__wrapper';
  const imgSrc = getImageSrc(image);
  wrapper.innerHTML = `
    <div class="product__image-wrapper">
      <img src="${imgSrc}" alt="${title}" class="product__image" width="757" height="427">
      ${discount > 0 ? `<div class="product__discount">-${discount}%</div>` : ``}
    </div>

    <div class="product__info">
      <div class="product__price">
        <p class="product__new-price">${format(calculatePriceWithDiscount(price, 1, discount))}</p>
        ${discount > 0 ? `
        <p class="product__old-price">
          <span class="visually-hidden">Старая цена</span>${price} ₽
        </p>
        ` : ``}
      </div>

      <p class="product__credit">В кредит от ${format(calculateCredit(price, 1))}</p>

      <div class="product__control">
        <button class="button product__to-cart">Добавить в корзину</button>
        <button class="product__to-favourite">
          <svg width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.6875 0.125C18.295 0.125 15.9987 1.23875 14.5 2.99875C13.0012 1.23875 10.705 0.125 8.3125 0.125C4.0775 0.125 0.75 3.4525 0.75 7.6875C0.75 12.885 5.425 17.12 12.5062 23.555L14.5 25.3563L16.4937 23.5413C23.575 17.12 28.25 12.885 28.25 7.6875C28.25 3.4525 24.9225 0.125 20.6875 0.125ZM14.6375 21.5062L14.5 21.6437L14.3625 21.5062C7.8175 15.58 3.5 11.6613 3.5 7.6875C3.5 4.9375 5.5625 2.875 8.3125 2.875C10.43 2.875 12.4925 4.23625 13.2212 6.12H15.7925C16.5075 4.23625 18.57 2.875 20.6875 2.875C23.4375 2.875 25.5 4.9375 25.5 7.6875C25.5 11.6613 21.1825 15.58 14.6375 21.5062Z"
              fill="#3670C7" />
          </svg>
        </button>
      </div>

      <div class="product__main-info">
        <div class="product__info-wrapper">
          <p class="product__info-title">Доставка</p>
          <div class="product__info-description">1-3 января</div>
        </div>

        <div class="product__info-wrapper">
          <p class="product__info-title">Продавец</p>
          <div class="product__info-description">ShopOnline</div>
        </div>
      </div>

      <button class="product__notification">Узнать о снижении цены</button>
    </div>
  `;
  return wrapper;
};
const createProductInfo = ({
  description
}) => {
  const info = document.createElement('div');
  info.className = 'product__more-info';
  const title = document.createElement('p');
  title.className = 'product__subtitle';
  title.textContent = 'Описание:';
  const text = document.createElement('p');
  text.className = 'product__description';
  text.textContent = description;
  info.append(title, text);
  return info;
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
const url = 'http://shorthaired-veiled-fascinator.glitch.me';
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
;// CONCATENATED MODULE: ./src/js/modules/profit.js


const placeProfit = async () => {
  const container = document.querySelector('.profit__container');
  container.style.display = 'none';
  const items = await getGoodsOnSale();
  const title = document.createElement('h2');
  title.className = 'subtitle';
  title.textContent = 'Это выгодно!';
  const ul = document.createElement('ul');
  ul.className = 'profit__list';
  const allItems = items.map(createCard);
  ul.append(...allItems);
  container.append(title, ul);
};
placeProfit();
;// CONCATENATED MODULE: ./src/js/index.js





/******/ })()
;
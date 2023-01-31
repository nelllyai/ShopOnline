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
const clearStorage = key => {
  localStorage.removeItem(key);
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
;// CONCATENATED MODULE: ./src/js/modules/pagination.js
const getArticles = async () => {
  const page = window.location.search;
  const result = await fetch(`https://gorest.co.in/public-api/posts${page}`);
  const info = await result.json();
  return info.data;
};
const renderArticles = async () => {
  const data = await getArticles();
  const listWrapper = document.querySelector('.main__container');
  const list = document.createElement('div');
  list.className = 'main__list';
  const articles = data.map(({
    id,
    title
  }) => {
    const card = document.createElement('a');
    card.className = 'article-card';
    card.href = `article.html?id=${id}`;
    card.innerHTML = `
      <img class="article-card__image" src="img/test.png" alt="Превью статьи" width="195" height="195">
      <div class="article-card__info">
        <h2 class="article-card__title">${title}</h2>
        <div class="article-card__wrapper">
          <p class="article-card__date">22 октября 2021, 12:45</p>
          <ul class="article-card__community">
            <li class="article-card__item article-card__item_views">1.2K</li>
            <li class="article-card__item article-card__item_comments">0</li>
          </ul>
        </div>
      </div>
    `;
    return card;
  });
  list.append(...articles);
  listWrapper.prepend(list);
};
const getPages = async () => {
  const result = await fetch('https://gorest.co.in/public-api/posts');
  const info = await result.json();
  return info.meta.pagination;
};
const renderButtons = (btnsGroup, pages, currentPage, prevArrow, nextArrow) => {
  const btnsValues = {
    prev: currentPage - 1,
    middle: currentPage,
    next: currentPage + 1
  };
  if (btnsValues.prev <= 0) {
    btnsValues.prev = currentPage;
    btnsValues.middle = currentPage + 1;
    btnsValues.next = currentPage + 2;
    prevArrow.classList.add('navigation__arrow_disabled');
  }
  if (btnsValues.next > pages) {
    btnsValues.prev = currentPage - 2;
    btnsValues.middle = currentPage - 1;
    btnsValues.next = currentPage;
    nextArrow.classList.add('navigation__arrow_disabled');
  }
  Object.values(btnsValues).forEach(val => {
    const btn = document.createElement('a');
    btn.className = 'navigation__button';
    if (val === currentPage) {
      btn.classList.add('navigation__button_active');
    }
    btn.href = `blog.html?page=${val}`;
    btn.textContent = val;
    btnsGroup.append(btn);
  });
};
const renderNavigation = async () => {
  const {
    pages
  } = await getPages();
  const navigation = document.createElement('div');
  navigation.className = 'navigation';
  navigation.innerHTML = `
    <a class="navigation__arrow navigation__arrow_prev">
      <svg width="29" height="19" viewBox="0 0 29 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M28.375 7.95833H6.52958L12.0487 2.42375L9.875 0.25L0.625 9.5L9.875 18.75L12.0487 16.5763L6.52958 11.0417H28.375V7.95833Z" />
      </svg>
    </a>
    <div class="navigation__buttons-group"></div>
    <a class="navigation__arrow navigation__arrow_next">
      <svg width="29" height="19" viewBox="0 0 29 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.625 7.95833H22.4704L16.9513 2.42375L19.125 0.25L28.375 9.5L19.125 18.75L16.9513 16.5763L22.4704 11.0417H0.625V7.95833Z" />
      </svg>
    </a>
  `;
  document.querySelector('.main__container').append(navigation);
  const btnsGroup = document.querySelector('.navigation__buttons-group');
  const prevArrow = document.querySelector('.navigation__arrow_prev');
  const nextArrow = document.querySelector('.navigation__arrow_next');
  const currentPage = Number(window.location.search.replace('?page=', '')) || 1;
  renderButtons(btnsGroup, pages, currentPage, prevArrow, nextArrow);
  prevArrow.href = `blog.html?page=${currentPage - 1}`;
  nextArrow.href = `blog.html?page=${currentPage + 1}`;
};
renderArticles();
renderNavigation();
;// CONCATENATED MODULE: ./src/js/blog.js




/******/ })()
;
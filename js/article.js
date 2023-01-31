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
;// CONCATENATED MODULE: ./src/js/modules/post.js
const getArticle = async () => {
  const id = window.location.search.replace('?id=', '');
  const result = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
  const info = await result.json();
  return info.data;
};
const getUser = async id => {
  const result = await fetch(`https://gorest.co.in/public-api/users/${id}`);
  const info = await result.json();
  return info.data;
};
const renderPost = async () => {
  const {
    title,
    body,
    ['user_id']: userId
  } = await getArticle();
  const {
    name: author
  } = await getUser(userId);
  const postNavigation = document.querySelector('.navigation-chain__item:last-child');
  postNavigation.textContent = title;
  const postContainer = document.querySelector('.post__container');
  const post = document.createElement('div');
  post.className = 'post__wrapper';
  post.innerHTML = `
    <h1 class="post__title">${title}</h1>
    <div class="post__text">
      <p class="post__paragraph">${body}</p>
    </div>

    <div class="post__footer">
      <div class="post__info">
        <p class="post__author">${author}</p>
        <p class="post__date">22 октября 2021, 12:45</p>
        <ul class="post__community">
          <li class="post__item post__item_views">1.2K</li>
          <li class="post__item post__item_comments">0</li>
        </ul>
      </div>

      <a class="post__button" href="blog.html">К списку статей</a>
    </div>
  `;
  postContainer.prepend(post);
};
renderPost();
;// CONCATENATED MODULE: ./src/js/article.js




/******/ })()
;
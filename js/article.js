/******/ (function() { // webpackBootstrap
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
;// CONCATENATED MODULE: ./src/js/modules/render.js


const renderRecommendations = async (container, {
  category
}) => {
  const items = await getGoodsByCategory(category);
  const title = document.createElement('h2');
  title.classList.add('subtitle', 'recommendation__title');
  title.textContent = 'Рекомендуем также';
  const ul = document.createElement('ul');
  ul.className = 'recommendation__list';
  const allItems = items.map(createCard);
  ul.append(...allItems);
  container.append(title, ul);
};
const renderProductBreadcrumbs = (categoryElement, titleElement, {
  title,
  category
}) => {
  const categoryLink = document.createElement('a');
  categoryLink.className = 'navigation-chain__link';
  categoryLink.href = 'category.html?search=' + category;
  categoryLink.textContent = category;
  titleElement.textContent = title;
  categoryElement.append(categoryLink);
};
const renderAdvertisement = container => {
  const aside = document.createElement('aside');
  aside.className = 'advertisement';
  aside.innerHTML = `
    <div class="advertisement__item advertisement__item_tour">
      <p class="advertisement__title">Горящие туры в&nbsp;Стамбул от&nbsp;20&nbsp;000 руб.</p>
      <p class="advertisement__info">Окунись в настоящую восточную сказку</p>
    </div>

    <div class="advertisement__item advertisement__item_car">
      <p class="advertisement__title">Новый RENAULT DUSTER</p>
      <p class="advertisement__info">Легендарный внедорожник в новом дизайне</p>
    </div>
  `;
  container.append(aside);
};
;// CONCATENATED MODULE: ./src/js/modules/preload.js
const preload = {
  arrows: `
    <div class="overlay__arrows">
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M142.5 60L112.5 90H135C135 114.825 114.825 135 90 135C82.425 135 75.225 133.125 69 129.75L58.05 140.7C67.275 146.55 78.225 150 90 150C123.15 150 150 123.15 150 90H172.5L142.5 60ZM45 90C45 65.175 65.175 45 90 45C97.575 45 104.775 46.875 111 50.25L121.95 39.3C112.725 33.45 101.775 30 90 30C56.85 30 30 56.85 30 90H7.5L37.5 120L67.5 90H45Z" fill="black"/>
      </svg>
    </div>`,
  overlay: document.createElement('div'),
  show(container) {
    this.overlay.classList.add('overlay');
    this.overlay.innerHTML = this.arrows;
    container.append(this.overlay);
  },
  showMiddle(container) {
    this.overlay.classList.add('overlay', 'overlay_middle');
    this.overlay.innerHTML = this.arrows;
    container.append(this.overlay);
  },
  showSmall(container) {
    this.overlay.classList.add('overlay', 'overlay_small');
    this.overlay.innerHTML = this.arrows;
    container.append(this.overlay);
  },
  remove() {
    this.overlay.remove();
  }
};
/* harmony default export */ var modules_preload = (preload);
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
const renderPost = async postContainer => {
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
const postContainer = document.querySelector('.post__container');
modules_preload.showMiddle(postContainer);
renderPost(postContainer).then(() => renderAdvertisement(postContainer)).then(() => modules_preload.remove());
;// CONCATENATED MODULE: ./src/js/article.js




/******/ })()
;
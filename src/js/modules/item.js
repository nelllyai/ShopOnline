import { createCard } from "./card.js";
import { getGoodsByCategory, getProduct } from "./getGoods.js";

const createProductWrapper = ({ title, price, discount, image }) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'product__wrapper';

  const imgSrc = image === 'image/notimage.jpg' ?
    'https://aqua-air.ru/bitrix/templates/kitlisa-market/img/shop.png' :
    `http://shorthaired-veiled-fascinator.glitch.me/${image}`;

  wrapper.innerHTML = `
    <div class="product__image-wrapper">
      <img src="${imgSrc}" alt="${title}" class="product__image" width="757" height="427">
      ${discount > 0 ? `<div class="product__discount">-${discount}%</div>` : ``}
    </div>

    <div class="product__info">
      <div class="product__price">
        <p class="product__new-price">${price - price * discount / 100} ₽</p>
        ${discount > 0 ? `
        <p class="product__old-price">
          <span class="visually-hidden">Старая цена</span>${price} ₽
        </p>
        ` : ``}
      </div>

      <p class="product__credit">В кредит от 5600 ₽ </p>

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

const createProductInfo = ({description}) => {
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

const renderRecommendations = async ({category}) => {
  const container = document.querySelector('.recomendation__container');
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

const renderProductBreadcrumbs = ({title, category}) => {
  const categoryItem = document.querySelector('.navigation-chain__item_category');
  const categoryLink = document.createElement('a');
  categoryLink.className = 'navigation-chain__link';
  categoryLink.href = 'category.html?search=' + category;
  categoryLink.textContent = category;
  categoryItem.append(categoryLink);

  const titleItem = document.querySelector('.navigation-chain__item_title');
  titleItem.textContent = title;
};

const renderProduct = async () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');
  const item = await getProduct(id);

  const container = document.querySelector('.product__container');

  const title = document.createElement('h1');
  title.classList.add('subtitle', 'product__title');
  title.textContent = item.title;

  const hr = document.createElement('hr');
  hr.className = 'product__hr';

  const productWrapper = createProductWrapper(item);
  const productDescription = createProductInfo(item);

  container.append(title, hr, productWrapper, productDescription);
  renderRecommendations(item);
  renderProductBreadcrumbs(item);
};

renderProduct();

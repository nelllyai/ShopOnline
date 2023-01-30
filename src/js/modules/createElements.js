import { calculateCredit, calculatePriceWithDiscount, format } from "./calculations.js";

const getImageSrc = image => {
  if (image === 'image/notimage.jpg') {
    return './img/no-image.png';
  }
  return `https://shorthaired-veiled-fascinator.glitch.me/${image}`;
};

export const createCard = ({ id, title, price, discount, image }) => {
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
      <p class="card__new-price">${format(calculatePriceWithDiscount(price, 1, discount))} ₽</p>
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

export const createProductWrapper = ({ title, price, discount, image }) => {
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

export const createProductInfo = ({ description }) => {
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

export const createCartProduct = ({ id, title, price, discount, image }, count) => {
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
          </div>` : ``
          }
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
      </div>` : ``
      }
      <div class="composition__credit">
        В кредит от&nbsp;${format(calculateCredit(price, count))}
      </div>
    </div>
  `;

  return li;
};

export const createProductPreview = ({title, image}) => {
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

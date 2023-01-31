import { calculateCredit, calculatePriceWithDiscount, format } from "./calculations.js";

export const getImageSrc = image => {
  if (image === 'image/notimage.jpg') {
    return './img/no-image.png';
  }
  return `https://shorthaired-veiled-fascinator.glitch.me/${image}`;
};

export const createCard = ({ id, title, price, discount, image }) => {
  const li = document.createElement('li');
  li.className = 'card';
  li.tabIndex = '0';

  const imgSrc = getImageSrc(image);

  li.innerHTML = `
  <a href="product.html?id=${id}" class="card__link">
    <div class="card__image-wrapper">
      <img src="${imgSrc}" alt="${title}" class="card__image" width="420" height="295">
      ${discount > 0 ? `<div class="card__discount">-${discount}%</div>` : ``}
    </div>
  
    <div class="card__price">
      <p class="card__new-price">${format(calculatePriceWithDiscount(price, 1, discount))}</p>
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

export const createCartProduct = ({ id, title, price, discount, image }, count, isChecked) => {
  const li = document.createElement('li');
  li.className = 'composition__full-product';
  li.dataset.id = id;

  const imgSrc = getImageSrc(image);

  li.innerHTML = `
    <div class="composition__column composition__column_item">
      <input type="checkbox" class="composition__checkbox composition__checkbox_item" ${isChecked ? 'checked' : ''}>
      <img src="${imgSrc}" alt="${title}" class="composition__product-image">

      <div class="composition__wrapper">
        <div class="composition__column composition__column_price composition__column_price_tablet">
          <div class="composition__new-price">
            ${format(calculatePriceWithDiscount(price, count, discount))}
          </div>
          ${discount > 0 ? `
          <div class="composition__old-price">
            ${(count * price)}&nbsp;₽
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

        <button class="composition__delete composition__delete_item">
          <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.0214 2.35355L13.1679 2.5H13.375H17.25V4H0.75V2.5H4.625H4.83211L4.97855 2.35355L6.08211 1.25H11.9179L13.0214 2.35355ZM4 22.75C2.90114 22.75 2 21.8489 2 20.75V6.25H16V20.75C16 21.8489 15.0989 22.75 14 22.75H4Z"
              fill="#C9C9C9" stroke="#C9C9C9" />
          </svg>
        </button>
    </div>

    <div class="composition__column composition__column_price composition__column_price_pc">
      <div class="composition__new-price">
        ${format(calculatePriceWithDiscount(price, count, discount))}
      </div>
      ${discount > 0 ? `
      <div class="composition__old-price">
        ${(count * price)}&nbsp;₽
      </div>` : ``
      }
      <div class="composition__credit">
        В кредит от&nbsp;${format(calculateCredit(price, count))}
      </div>
    </div>
  `;

  return li;
};

export const createProductPreview = ({id, title, image}) => {
  const li = document.createElement('li');
  li.className = 'composition__product';
  li.dataset.id = id;

  const img = document.createElement('img');
  img.alt = title;
  img.classList.add('composition__product-image', 'composition__product-image_small');

  const imgSrc = getImageSrc(image);
  img.src = imgSrc;

  li.append(img);
  return li;
};

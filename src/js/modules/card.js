export const createCard = ({ id, title, price, discount, image }) => {
  const li = document.createElement('li');
  li.className = 'card';

  const imgSrc = image === 'image/notimage.jpg' ?
    'https://aqua-air.ru/bitrix/templates/kitlisa-market/img/shop.png' :
    `http://shorthaired-veiled-fascinator.glitch.me/${image}`;

  li.innerHTML = `
  <a href="product.html?id=${id}" class="card__link">
    <div class="card__image-wrapper">
      <img src="${imgSrc}" alt="${title}" class="card__image" width="420" height="295">
      ${discount > 0 ? `<div class="card__discount">-${discount}%</div>` : ``}
    </div>
  
    <div class="card__price">
      <p class="card__new-price">${price - price * discount / 100} ₽</p>
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

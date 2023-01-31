import { calculatePriceWithDiscount, calculatePriceWithoutDiscount, format } from "./calculations.js";
import { addBtnControl } from "./control.js";
import { getImageSrc } from "./createElements.js";
import { getProduct } from "./getGoods.js";
import { renderRecommendations } from "./render.js";

const placeProduct = async () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');
  const item = await getProduct(id);
  const { title, price, category, image, description, discount } = item;

  const container = document.querySelector('.product__container');

  const categoryItem = document.querySelector('.navigation-chain__link_category');
  categoryItem.href = 'category.html?search=' + category;
  categoryItem.textContent = category;

  const titleItem = document.querySelector('.navigation-chain__item_title');
  titleItem.textContent = title;

  const header = container.querySelector('h1');
  header.textContent = title;

  const img = container.querySelector('.product__image');
  img.src = getImageSrc(image);

  const newPrice = container.querySelector('.product__new-price');
  newPrice.textContent = format(calculatePriceWithDiscount(price, 1, discount));

  if (discount > 0) {
    const oldPrice = document.createElement('p');
    oldPrice.className = 'product__old-price';
    oldPrice.textContent = format(calculatePriceWithoutDiscount(price, 1));

    container.querySelector('.product__price').append(oldPrice);
  }

  const descriptionWrapper = document.querySelector('.product__description');
  descriptionWrapper.textContent = description;

  const recommendation = document.querySelector('.recommendation__container');
  renderRecommendations(recommendation, item);

  const addBtn = document.querySelector('.product__to-cart');
  addBtnControl(addBtn, +id);
};

window.onload = function () {
  placeProduct();
};

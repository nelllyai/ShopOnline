import { addBtnControl } from "./control.js";
import { createProductInfo, createProductWrapper } from "./createElements.js";
import { getProduct } from "./getGoods.js";
import { renderProductBreadcrumbs, renderRecommendations } from "./render.js";

const placeProduct = async () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');
  const item = await getProduct(id);

  const container = document.querySelector('.product__container');
  const recommendation = document.querySelector('.recommendation__container');
  const categoryItem = document.querySelector('.navigation-chain__item_category');
  const titleItem = document.querySelector('.navigation-chain__item_title');

  const title = document.createElement('h1');
  title.classList.add('subtitle', 'product__title');
  title.textContent = item.title;

  const hr = document.createElement('hr');
  hr.className = 'product__hr';

  const productWrapper = createProductWrapper(item);
  const productDescription = createProductInfo(item);

  container.append(title, hr, productWrapper, productDescription);
  renderRecommendations(recommendation, item);
  renderProductBreadcrumbs(categoryItem, titleItem, item);

  const addBtn = document.querySelector('.product__to-cart');
  addBtnControl(addBtn, +id);
};

placeProduct();

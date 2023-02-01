import { createCard } from "./createElements.js";
import { getGoodsByCategory } from "./getGoods.js";
import preload from "./preload.js";

const placeCategoryList = async container => {
  const url = new URL(window.location.href);
  const category = url.searchParams.get('search');
  const items = await getGoodsByCategory(category);

  const title = document.querySelector('h1');
  title.textContent = category;

  const ul = document.createElement('ul');
  ul.className = 'category-goods__list';

  const allItems = items.map(createCard);
  ul.append(...allItems);

  container.append(title, ul);
};

const container = document.querySelector('.category-goods__container');

preload.showSmall(container);
placeCategoryList(container)
  .then(() => preload.remove());

import { createCard } from "./card.js";
import { getGoodsByCategory } from "./getGoods.js";

const renderCategoryList = async () => {
  const url = new URL(window.location.href);
  const category = url.searchParams.get('search');
  const items = await getGoodsByCategory(category);

  const container = document.querySelector('.category-goods__container');

  const title = document.createElement('h1');
  title.className = 'subtitle';
  title.textContent = category;

  const ul = document.createElement('ul');
  ul.className = 'category-goods__list';

  const allItems = items.map(createCard);
  ul.append(...allItems);

  container.append(title, ul);
};

renderCategoryList();

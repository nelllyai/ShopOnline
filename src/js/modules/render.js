import { createCard } from "./createElements.js";
import { getGoodsByCategory } from "./getGoods.js";

export const renderRecommendations = async (container, { category }) => {
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

export const renderProductBreadcrumbs = (categoryElement, titleElement, { title, category }) => {
  const categoryLink = document.createElement('a');
  categoryLink.className = 'navigation-chain__link';
  categoryLink.href = 'category.html?search=' + category;
  categoryLink.textContent = category;

  titleElement.textContent = title;
  categoryElement.append(categoryLink);
};

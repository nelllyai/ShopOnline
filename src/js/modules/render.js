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

export const renderAdvertisement = container => {
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

import { createCard } from "./createElements.js";
import { getGoodsOnSale } from "./getGoods.js";

const placeProfit = async () => {
  const container = document.querySelector('.profit__container');
  const items = await getGoodsOnSale();

  const title = document.createElement('h2');
  title.className = 'subtitle';
  title.textContent = 'Это выгодно!';

  const ul = document.createElement('ul');
  ul.className = 'profit__list';

  const allItems = items.map(createCard);
  ul.append(...allItems);

  container.append(title, ul);
};

placeProfit();

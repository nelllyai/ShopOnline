import { createCartProduct } from "./createElements.js";
import { getProduct } from "./getGoods.js";
import { getStorage } from "./storageControl.js";
import { addBtnControl, delBtnControl, getProductById } from "./control.js";

const isCartEmpty = () => {
  const items = getStorage('cart');
  return items.length === 0;
};

const cleanCart = () => {
  const titleCart = document.querySelector('h1');
  titleCart.textContent = 'В корзине пусто...'
  const controls = document.querySelector('.composition__controls');
  controls.remove();
};

const getActualProductInfo = async item => {
  return {
    info: await getProduct(item.id),
    quantity: item.quantity
  };
};

const getActualGoodsInfo = async items => {
  return await Promise.all(items.map(async item =>
    getActualProductInfo(item)));
};

const getTotal = async items => {
  const actualGoods = await getActualGoodsInfo(items);

  let totalPrice = 0;
  let totalQuantity = 0;
  let totalDiscount = 0;

  actualGoods.forEach(product => {
    totalPrice += product.quantity * (product.info.price - product.info.price * product.info.discount / 100);
    totalQuantity += product.quantity;
    totalDiscount += product.quantity * (product.info.price * product.info.discount / 100);
  });

  return { totalPrice, totalQuantity, totalDiscount };
};

const updateTotalBlock = async () => {
  const newItems = getStorage('cart');
  const { totalPrice, totalQuantity, totalDiscount } = await getTotal(newItems);

  const totalPriceWrapper = document.querySelector('.composition__cost');
  totalPriceWrapper.textContent = `${(totalPrice || 0).toFixed(2)}\xa0₽`;

  const totalQuantityWrapper = document.querySelector('.composition__info-title_goods');
  totalQuantityWrapper.textContent = `Товары, ${totalQuantity} шт.`;

  const totalDiscountWrapper = document.querySelector('.composition__info_discount');
  totalDiscountWrapper.textContent = `${(totalDiscount || 0).toFixed(2)}\xa0₽`;
};

const placeCart = async () => {
  if (isCartEmpty()) {
    cleanCart();
    return;
  }

  const items = getStorage('cart');
  const container = document.querySelector('.composition__cart');

  const list = document.createElement('ul');
  list.className = 'composition__full-order';

  const goods = await getActualGoodsInfo(items);

  const allItems = goods.map(product => createCartProduct(product.info, product.quantity));
  list.append(...allItems);

  container.append(list);
  await updateTotalBlock();

  const addBtns = document.querySelectorAll('.composition__count-button_plus');
  addBtns.forEach(btn => {
    const itemId = +btn.closest('li').dataset.id;
    addBtnControl(btn, itemId);
  });

  const delBtns = document.querySelectorAll('.composition__count-button_minus');
  delBtns.forEach(btn => {
    const itemId = +btn.closest('li').dataset.id;
    delBtnControl(btn, itemId);
  });

  const controlBtns = document.querySelectorAll('.composition__count-button');
  controlBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      await updateTotalBlock();
      const listElement = btn.closest('li');
      const itemId = +listElement.dataset.id;
      const itemInStorage = getProductById(itemId);

      const item = goods.find(product => product.info.id == itemId);

      if (!itemInStorage) {
        listElement.remove();
        if (isCartEmpty()) cleanCart();
      }
      else {
        const { price, discount } = item.info;
        const count = itemInStorage.quantity;

        const quantityWrapper = listElement.querySelector('.composition__quantity');
        quantityWrapper.textContent = count;

        const priceWrappers = listElement.querySelectorAll('.composition__new-price');
        priceWrappers.forEach(elem =>
          elem.textContent = `${(count * (price - price * discount / 100)).toFixed(2)}\xa0₽`);

        const oldPriceWrappers = listElement.querySelectorAll('.composition__old-price');
        oldPriceWrappers.forEach(elem =>
          elem.textContent = `${(count * price).toFixed(2)}\xa0₽`);

        const creditWrappers = listElement.querySelectorAll('.composition__credit');
        creditWrappers.forEach(elem => {
          elem.textContent = `В кредит от\xa0${(count * price * 0.05).toFixed(2)}\xa0₽`;
        });
      }
    });
  });
};

placeCart();

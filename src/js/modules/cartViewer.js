import { createCartProduct, createProductPreview } from "./createElements.js";
import { getProduct } from "./getGoods.js";
import { getStorage } from "./storageControl.js";
import { addBtnControl, delAllBtnControl, delBtnControl, delItemBtnControl, getProductById } from "./control.js";
import { calculateCredit, calculateDiscount, calculatePriceWithDiscount, calculatePriceWithoutDiscount, format } from "./calculations.js";

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

  let totalPrice = 0,
    totalQuantity = 0,
    totalDiscount = 0,
    totalWithoutDiscount = 0;

  actualGoods.forEach(product => {
    const {price, discount} = product.info;
    const quantity = product.quantity;

    totalPrice += calculatePriceWithDiscount(price, quantity, discount);
    totalQuantity += quantity;
    totalWithoutDiscount += calculatePriceWithoutDiscount(price, quantity);
    totalDiscount += calculateDiscount(price, quantity, discount);
  });

  return { totalPrice, totalQuantity, totalWithoutDiscount, totalDiscount };
};

const updateTotalBlock = async () => {
  const newItems = getStorage('cart');
  const { totalPrice, totalQuantity, totalWithoutDiscount, totalDiscount } = await getTotal(newItems);
  console.log(totalPrice);

  const totalPriceWrapper = document.querySelector('.composition__cost');
  totalPriceWrapper.textContent = format(totalPrice);

  const totalQuantityWrapper = document.querySelector('.composition__info-title_goods');
  totalQuantityWrapper.textContent = `Товары, ${totalQuantity} шт.`;

  const totalWithoutDiscountWrapper = document.querySelector('.composition__info_without-discount');
  totalWithoutDiscountWrapper.textContent = format(totalWithoutDiscount);

  const totalDiscountWrapper = document.querySelector('.composition__info_discount');
  totalDiscountWrapper.textContent = format(totalDiscount);
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

  const previewsContainer = document.querySelector('.composition__goods');
  const previews = goods.map(product => createProductPreview(product.info));
  previewsContainer.append(...previews);

  container.append(list);
  await updateTotalBlock();
};

placeCart();

const mainCheckbox = document.querySelector('.composition__checkbox_all-items');
mainCheckbox.addEventListener('change', e => {
  const checkboxes = document.querySelectorAll('.composition__checkbox_item');

  if (e.target.checked) {
    checkboxes.forEach(checkbox => {
      checkbox.checked = true;
    });
  } else {
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  }
});

const delAllBtn = document.querySelector('.composition__delete_all');
delAllBtnControl(delAllBtn);
delAllBtn.addEventListener('click', async () => {
  await updateTotalBlock();
  cleanCart();
  list.remove();
  previewsContainer.innerHTML = '';
});

const delItemBtns = document.querySelectorAll('.composition__delete_item');
delItemBtns.forEach(btn => {
  const itemId = +btn.closest('li').dataset.id;
  delItemBtnControl(btn, itemId);
});

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

const controlBtns = document.querySelectorAll('.composition__count-button, .composition__delete');
controlBtns.forEach(btn => {
  btn.addEventListener('click', async () => {
    await updateTotalBlock();
    const listElement = btn.closest('li');
    const itemId = +listElement.dataset.id;
    const itemInStorage = getProductById(itemId);

    const item = goods.find(product => product.info.id == itemId);

    if (!itemInStorage) {
      listElement.remove();

      const preview = previewsContainer.querySelector(`[data-id="${itemId}"`);
      preview.remove();

      if (isCartEmpty()) cleanCart();
    }
    else {
      const { price, discount } = item.info;
      const count = itemInStorage.quantity;

      const quantityWrapper = listElement.querySelector('.composition__quantity');
      quantityWrapper.textContent = count;

      const priceWrappers = listElement.querySelectorAll('.composition__new-price');
      priceWrappers.forEach(elem =>
        elem.textContent = format(calculatePriceWithDiscount(price, count, discount)));

      const oldPriceWrappers = listElement.querySelectorAll('.composition__old-price');
      oldPriceWrappers.forEach(elem =>
        elem.textContent = format(calculatePriceWithoutDiscount(price, count)));

      const creditWrappers = listElement.querySelectorAll('.composition__credit');
      creditWrappers.forEach(elem =>
        elem.textContent = `В кредит от\xa0${format(calculateCredit(price, count))}`);
    }
  });
});

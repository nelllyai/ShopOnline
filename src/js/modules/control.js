import { updateIconCart } from "./iconCart.js";
import { addStorage, editStorage, getStorage, removeStorage } from "./storageControl.js";

export const getProductById = id => {
  const cart = getStorage('cart');
  return cart.find(item => item.id === id);
};

export const addBtnControl = (btn, id) => {
  btn.addEventListener('click', () => {
    const product = getProductById(id);

    if (product) {
      editStorage('cart', id, 'quantity', product.quantity + 1);
    } else {
      addStorage('cart', {
        id,
        quantity: 1
      });
    }

    updateIconCart();
  });
};

export const delBtnControl = (btn, id) => {
  btn.addEventListener('click', () => {
    const product = getProductById(id);

    if (product.quantity > 1) {
      editStorage('cart', id, 'quantity', product.quantity - 1);
    } else {
      removeStorage('cart', id);
    }
  });
  
  updateIconCart();
};

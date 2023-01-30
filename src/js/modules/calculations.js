export const format = number => {
  return `${number.toFixed(2)}\xa0₽`;
};

export const calculateDiscount = (price, quantity, discount) => {
  return (quantity * (price * discount / 100));
};

export const calculatePriceWithDiscount = (price, quantity, discount) => {
  return (quantity * (price - price * discount / 100));
};

export const calculatePriceWithoutDiscount = (price, quantity) => {
  return (price * quantity);
};

export const calculateCredit = (price, quantity) => {
  return (price * quantity * 0.05);
};

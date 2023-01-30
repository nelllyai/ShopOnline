const url = 'https://shorthaired-veiled-fascinator.glitch.me';

export const getGoods = async () => {
  const result = await fetch(`${url}/api/goods`);
  const goods = await result.json();
  return goods;
};

export const getProduct = async id => {
  const result = await fetch(`${url}/api/goods/${id}`);
  const product = await result.json();
  return product;
};

export const getGoodsByCategory = async category => {
  const goods = await getGoods();
  const list = goods.filter(product =>
    product.category.toLowerCase().startsWith(category.toLowerCase()));
  return list;
};

export const getGoodsOnSale = async () => {
  const goods = await getGoods();
  const list = goods.filter(product => product.discount > 0);
  return list;
};

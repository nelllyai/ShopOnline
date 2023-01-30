const getCategories = async () => {
  const result = await fetch(`http://shorthaired-veiled-fascinator.glitch.me/api/category`);
  const list = await result.json();
  return list;
};

const createFooterElement = text => {
  const li = document.createElement('li');
  li.className = 'footer__item';

  const link = document.createElement('a');
  link.className = 'footer__link';
  link.href = 'category.html?search=' + text;
  link.textContent = text;

  li.append(link);
  return li;
};

const createMenuElement = text => {
  const li = document.createElement('li');
  li.className = 'menu__item';

  const link = document.createElement('a');
  link.className = 'menu__link';
  link.href = 'category.html?search=' + text;
  link.textContent = text;

  li.append(link);
  return li;
};

const renderCategories = async () => {
  const categories = await getCategories();
  const footerList = document.querySelector('.footer__list_two-cols');
  const menuList = document.querySelector('.menu__list_two-cols');

  footerList.append(...categories.map(createFooterElement));
  menuList.append(...categories.map(createMenuElement));
};

renderCategories();

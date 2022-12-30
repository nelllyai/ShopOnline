const getArticles = async () => {
  const page = window.location.search;
  const result = await fetch(`https://gorest.co.in/public-api/posts${page}`);
  const info = await result.json();
  return info.data;
};

const renderArticles = async () => {
  const data = await getArticles();
  const listWrapper = document.querySelector('.main__container');
  const list = document.createElement('div');
  list.className = 'main__list';

  const articles = data.map(({ id, title }) => {
    const card = document.createElement('a');
    card.className = 'article-card';
    card.href = `article.html?id=${id}`;
    card.innerHTML = `
      <img class="article-card__image" src="img/test.png" alt="Превью статьи">
      <div class="article-card__info">
        <h2 class="article-card__title">${title}</h2>
        <p class="article-card__date">22 октября 2021, 12:45</p>
        <ul class="article-card__community">
          <li class="article-card__item article-card__item_views">1.2K</li>
          <li class="article-card__item article-card__item_comments">0</li>
        </ul>
      </div>
    `;
    return card;
  });

  list.append(...articles);
  listWrapper.prepend(list);
};
const getPages = async () => {
  const result = await fetch('https://gorest.co.in/public-api/posts');
  const info = await result.json();
  return info.meta.pagination;
};

const rendetButtons = (btnsGroup, pages, currentPage, prevArrow, nextArrow) => {
  const btnsValues = {
    prev: currentPage - 1,
    middle: currentPage,
    next: currentPage + 1
  };

  if (btnsValues.prev <= 0) {
    btnsValues.prev = currentPage;
    btnsValues.middle = currentPage + 1;
    btnsValues.next = currentPage + 2;
    prevArrow.classList.add('navigation__arrow_disabled');
  }

  if (btnsValues.next > pages) {
    btnsValues.prev = currentPage - 2;
    btnsValues.middle = currentPage - 1;
    btnsValues.next = currentPage;
    nextArrow.classList.add('navigation__arrow_disabled');
  }

  Object.values(btnsValues).forEach(val => {
    const btn = document.createElement('a');
    btn.className = 'navigation__button';
    if (val === currentPage) {
      btn.classList.add('navigation__button_active');
    }
    btn.href = `blog.html?page=${val}`;
    btn.textContent = val;
    btnsGroup.append(btn);
  });
};

const renderNavigation = async () => {
  const { pages } = await getPages();
  const btnsGroup = document.querySelector('.navigation__buttons-group');
  const prevArrow = document.querySelector('.navigation__arrow_prev');
  const nextArrow = document.querySelector('.navigation__arrow_next');

  const currentPage = Number(window.location.search.replace('?page=', '')) || 1;

  rendetButtons(btnsGroup, pages, currentPage, prevArrow, nextArrow);

  prevArrow.href = `blog.html?page=${currentPage - 1}`;
  nextArrow.href = `blog.html?page=${currentPage + 1}`;
};


renderArticles();
renderNavigation();
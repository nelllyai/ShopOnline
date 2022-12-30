const getArticle = async () => {
  const id = window.location.search.replace('?id=', '');
  const result = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
  const info = await result.json();
  return info.data;
};

const getUser = async (id) => {
  const result = await fetch(`https://gorest.co.in/public-api/users/${id}`);
  const info = await result.json();
  return info.data;
};

const renderPost = async () => {
  const {title, body, ['user_id']: userId} = await getArticle();
  const {name: author} = await getUser(userId);

  const postNavigation = document.querySelector('.article-navigation__item:last-child');
  postNavigation.textContent = title;
  
  const postContainer = document.querySelector('.post__container');
  const post = document.createElement('div');
  post.className = 'post__wrapper';

  post.innerHTML = `
    <h1 class="post__title">${title}</h1>
    <div class="post__text">
      <p class="post__paragraph">${body}</p>
    </div>

    <div class="post__footer">
      <div class="post__info">
        <p class="post__author">${author}</p>
        <p class="post__date">22 октября 2021, 12:45</p>
        <ul class="post__community">
          <li class="post__item post__item_views">1.2K</li>
          <li class="post__item post__item_comments">0</li>
        </ul>
      </div>

      <a class="post__button" href="blog.html">К списку статей</a>
    </div>
  `;

  postContainer.prepend(post);
};

renderPost();
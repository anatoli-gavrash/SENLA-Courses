// Проверяем пользователя и отрисовываем скрытые элементы
function showElements() {
  const activeUser = JSON.parse(localStorage.getItem('activeUser'));
  if (activeUser) {
    const buttonDelete = document.querySelector('.film-details__button-delete');
    const buttonEdit = document.querySelector('.film-details__button-edit');
    const formVote = document.querySelector('.film-details__form');

    if (activeUser.access === 'admin') {
      buttonDelete.classList.add('show-button');
      buttonEdit.classList.add('show-button');
      formVote.classList.add('film-details__form--show');
    } else if (activeUser.access === 'normal') {
      buttonDelete.classList.remove('show-button');
      buttonEdit.classList.remove('show-button');
      formVote.classList.add('film-details__form--show');
    } else {
      buttonDelete.classList.remove('show-button');
      buttonEdit.classList.remove('show-button');
      formVote.classList.remove('film-details__form--show');
    }
  }
}
showElements();

// Функция берёт строку и возвращает id фильма
function getId() {
  const string = location.href;
  return string.split('id=').pop();
}

function createListElement(info) {
  const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const list = document.querySelector('.gallery__video-list');
  let newElement = document.createElement('li');
  let poster = info.poster_path ? posterBaseUrl + info.poster_path : './images/error__icon.svg';
    
  newElement.className = "video-list__item";
  newElement.innerHTML = `
    <div class="video-list__details-wrapper" tabindex="0">
      <img class="video-list__film-poster" src="${poster}" id="${info.id}" alt="Постер фильма ${info.title}">
      <p class="video-list__rating">${info.vote_average.toFixed(1)}</p>
      <button class="video-list__button-delete"></button>
      <time class="video-list__release-date" datetime="${info.release_date}">${info.release_date}</time>
    </div>
    <p class="video-list__filmName">${info.title}</p>
  `;
  list.append(newElement);
}

// Отрисовываем нашу страницу в зависимости от фильма
async function addInfo() {
  const id = getId();
  const apiKey = '96f5267da6e441141dfe8db15267079b';
  const language = 'ru-RU';
  const posterBaseUrl = 'https://image.tmdb.org/t/p/original'
  const info = await (await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=${language}`)).json();
  const poster = info.poster_path ? posterBaseUrl + info.poster_path : './images/error__icon.svg';
  const date = String(info.release_date).split('-').join('-');
  const genres = info.genres.map(element => element.name).join(', ');

  document.querySelector('.film-details__poster').setAttribute('src', posterBaseUrl + poster);
  document.querySelector('.film-details__title').innerText = info.title;
  document.querySelector('.text-rating').innerText = String(info.vote_average).replace('.', '') + '%';
  document.querySelector('.film-details__date').setAttribute('datetime', date);
  document.querySelector('.film-details__date').innerText = date;
  document.querySelector('.text-genres').innerText = genres;
  document.querySelector('.text-vote-count span').innerText = info.vote_count;
  document.querySelector('.text-popularity span').innerText = info.popularity;
  document.querySelector('.text-overview span').innerText = info.overview;
}
addInfo();

// При нажатии на "Оценить"
document.querySelector('.form-vote__button-submit').addEventListener('click', evnt => {
  const voteField = evnt.target.parentNode.querySelector('.form-vote__input');
  const voteValue = +voteField.value;
  const voteFieldValidation = voteField.validity.valid;
  const errorLabel = evnt.target.parentNode.querySelector('.form-vote__label-error');

  if (!voteFieldValidation || !voteValidation(voteValue)) {
    errorLabel.classList.add('show-error');
    evnt.preventDefault();
  } else {
    errorLabel.classList.remove('show-error');
    window.location.reload();
  }
});

// Обрабатываем enter в поле ввода
document.querySelector('.form-vote__input').addEventListener('keydown', keyEvent => {
  if (keyEvent.keyCode === 13) {
    const voteFieldValue = keyEvent.target.value;
    const voteFieldValidation = keyEvent.target.validity.valid;
    const errorLabel = keyEvent.target.parentNode.querySelector('.form-vote__label-error');
    if (!voteFieldValidation || !voteValidation(voteFieldValue)) {
      errorLabel.classList.add('show-error');
    } else {
      errorLabel.classList.remove('show-error');
      window.location.reload();
    }
    keyEvent.preventDefault();
  }
});

// Проверяем число в поле оценки фильма. Возвращает true если это число от 0.5 до 10 иначе false
function voteValidation(value) {
  return !isNaN(value) && value >= 0.5 && value <= 10;
}
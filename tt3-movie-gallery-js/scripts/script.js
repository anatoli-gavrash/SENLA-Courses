// Собираем данные для отрисовки страницы
async function fillingHomePage() {
  showElements();
  await getFimls();

  const apiKey = '96f5267da6e441141dfe8db15267079b';
  const list = '7095546';
  let language = 'ru-RU';
  let sortBy = 'original_order.desc'; //primary_release_date.desc primary_release_date.asc vote_average.desc vote_average.asc
  let listPage = '1';
  let request = `https://api.themoviedb.org/4/list/${list}?api_key=${apiKey}&language=${language}&sort_by=${sortBy}&page=${listPage}`;
  let answer, sortingData;

  // Если мы не на главной, то собираем запрос в зависимости от адреса, иначе отрисовка по умолчанию.
  if (location.href.indexOf('?') !== -1) {
    sortingData = splitLink();
    request = `https://api.themoviedb.org/4/list/${list}?api_key=${apiKey}&language=${language}&sort_by=${sortingData[0]}&page=${sortingData[1]}`;
    answer = await (await fetch(request)).json();
  } else {
    sortingData = [sortBy, listPage];
    answer = await (await fetch(request)).json();
  }
  
  // Если есть новые фильмы в локальном хранилище добавляем в начало списка
  const localFilms = JSON.parse(localStorage.getItem('admin-films'));
  let newFilmsList = [];

  // Ищем новые фильмы в локальном хранилище
  if (localFilms) {
    for (let i = 0; i < localFilms.movieList.length; i++) {
      if (localFilms.movieList[i].new) { newFilmsList.push(localFilms.movieList[i]); }
    }
  }
  
  if (sortingData[0] === 'original_order.desc' && +sortingData[1] === 1 && newFilmsList) {
    createFilmList(newFilmsList);
    createFilmList(answer.results, (answer.results.length - newFilmsList.length));
  }
  else {
    createFilmList(answer.results);
  }

  sortingChoice(sortingData[0]);
  createPagination(+sortingData[1], +answer.total_pages, 15);
}
fillingHomePage();

// Проверяем пользователя и отрисовываем скрытые элементы
function showElements() {
  const activeUser = JSON.parse(localStorage.getItem('activeUser'));
  if (activeUser) {
    const buttonAdd = document.querySelector('.gallery__add-link');

    if (activeUser.access === 'admin') { buttonAdd.classList.add('show-add-link'); }
    else { buttonAdd.classList.remove('show-add-link'); }
  }
}

// Функция добавляет фильмы из json файла, если не существует данных в локальном хранилище
async function getFimls() {
  const adminFilms = await (await fetch('./src/dummy_data/admin-films.json')).json();
  storageData = JSON.parse(localStorage.getItem('admin-films'));
  if (!storageData) { localStorage.setItem('admin-films', JSON.stringify(adminFilms)); }
}

// Режем ссылку на части и возвращаем массив с сортировкой и страницей для запроса
function splitLink() {
  const string = location.href;
  return string.split('?').pop().split('/').map(element => element.split('=').pop());
}


// Блок с фильмами -------------------------------------------------------------
// Отрисовываем страницу по полученному запросу
function createFilmList(filmListArray, length) {
  const arrayLength = length ? length : filmListArray.length;

  for (let i = 0; i < arrayLength; i++) {
    const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';
    const list = document.querySelector('.gallery__video-list');
    let poster = filmListArray[i].poster_path ? posterBaseUrl + filmListArray[i].poster_path : './images/error__icon.svg';
    
    // Добавляем класс у кнопки удаления, если авторизован админ
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    let adminDeleteButton;
    if (activeUser) {
      if (activeUser.access === 'admin') {
        adminDeleteButton = ' show-button-delete';
      }
    } else {
      adminDeleteButton = '';
    }
    
    let newElement = document.createElement('li');
    newElement.className = "video-list__item";
    newElement.innerHTML = `
      <div class="video-list__details-wrapper" tabindex="0">
        <img class="video-list__film-poster" src="${poster}" id="${filmListArray[i].id}" alt="Постер фильма ${filmListArray[i].title}">
        <p class="video-list__rating">${filmListArray[i].vote_average.toFixed(1)}</p>
        <button class="video-list__button-delete${adminDeleteButton}"></button>
        <time class="video-list__release-date" datetime="${filmListArray[i].release_date}">${filmListArray[i].release_date}</time>
      </div>
      <p class="video-list__filmName">${filmListArray[i].title}</p>
    `;
    list.append(newElement);
  }
}

// Переходим на страницу с детальной информацией о фильме
document.querySelector('.gallery__video-list').addEventListener('click', evnt => {
  if (evnt.target.classList.contains('video-list__film-poster')) {
    const id = evnt.target.id;
    location.href = 'film-details.html' + '?' + 'id=' + id;
  }
});

// Обработка клавиши удаления у админа
document.querySelector('.gallery__video-list').addEventListener('click', evnt => {
  if (evnt.target.classList.contains('video-list__button-delete')) {
    const parent = evnt.target.parentNode;
    const filmId = +parent.querySelector('.video-list__film-poster').id;
    
    // Функция находится в remove.js. Удаление из api занимает 3-5 секунд.
    removeFilm(filmId, parent.parentNode);
  }
});

// Сортировка -------------------------------------------------------------
// Выбираем нужный тип сортировки при загрузке страницы
function sortingChoice(sortingType) {
  const select = document.querySelector('.gallery__sorting');
  select.value = sortingType;
}

// Обрабатываем тип сортировки при изменении select
document.querySelector('.gallery__sorting').addEventListener('change', evnt => {
  const sorting = evnt.target.value;
  location.href = 'index.html' + '?' + 'sort_by=' + sorting + '/page=1';
});


// Пагинация -------------------------------------------------------------
// Функция принимает:
// Активную страницу для отрисовки, макс. кол-во страниц из запроса и
// макс. кол-во страниц в пагинации(если нет 3 параметра - отрисовываем все страницы)
function createPagination(activePageNumber, numOfPages, limitPages) {
  const maxPages = numOfPages > limitPages ? limitPages : numOfPages;
  const maxLoopsCount = numOfPages > 4 ? 4 : numOfPages - 1;
  let elementArray;
  
  // Проверяем активную страницу и последнюю и заполняем массив для отрисовки
  if (maxPages > 5) {
    if (activePageNumber <= 3) {
      elementArray = [2, 3, '...', maxPages];
    } else if ((maxPages - activePageNumber) <= 2) {
      elementArray = ['...', maxPages - 2, maxPages - 1, maxPages];
    } else {
      elementArray = ['...', activePageNumber, '...', maxPages];
    }
  } else {
    elementArray = [2, 3, 4, 5];
  }

  // Добавляем элементы пагинации
  const secondChild = document.querySelector('.pagination__item:nth-child(2)');
  const lastChild = document.querySelector('.pagination__item:last-child');
  for (let i = 0; i < maxLoopsCount; i++) {
    const newElement = document.createElement('li');
    let active;

    if (activePageNumber === elementArray[i]) {
      secondChild.classList.remove('active');
      active = ' active';
    }
    else {
      active = ''
    }

    newElement.className = "pagination__item" + active;
    newElement.innerHTML = `
      <button class="pagination__button">${elementArray[i]}</button>
    `;
    lastChild.before(newElement);
  }
}

// Обработка пагинации по клику мыши
document.querySelector('.gallery__pagination').addEventListener('click', evnt => {
  if (evnt.target.classList.contains('pagination__button')) {
    const buttonValue = evnt.target.innerText;
    let sorting;
    
    // Если пришло число, отрисовываем страницу по этому
    if (+buttonValue) {
      if (location.href.indexOf('?') !== -1) { sorting = splitLink()[0]; }
      else { sorting = ['original_order.desc']; }
      location.href = 'index.html' + '?' + 'sort_by=' + sorting + '/page=' + buttonValue;
    }
    // Если нажали на кнопки prev, next. Пробуем перейти на соотвествующие страницы
    else if (buttonValue === 'Prev') {
      if (location.href.indexOf('?') !== -1) {
        sorting = splitLink();
        if (sorting[1] > 1) {
          location.href = 'index.html' + '?' + 'sort_by=' + sorting[0] + '/page=' + (sorting[1] - 1);
        }
      }    
    } else if (buttonValue === 'Next') {
      if (location.href.indexOf('?') !== -1) {
        const lastPageValue = document.querySelector('.pagination__item:last-child').previousElementSibling.innerText;
        sorting = splitLink();
        if ((+sorting[1]) < +lastPageValue) {
          location.href = 'index.html' + '?' + 'sort_by=' + sorting[0] + '/page=' + (+sorting[1] + 1);
        }
      } else {
        location.href = 'index.html' + '?' + 'sort_by=' + 'original_order.desc' + '/page=2';
      } 
    }
  }
});
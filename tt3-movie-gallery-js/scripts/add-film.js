// Проверяем пользователя. Если не админ - отправляем на страницу ошибки.
function showAdmin() {
  const activeUser = JSON.parse(localStorage.getItem('activeUser'));
  if (activeUser && activeUser.access === 'admin') {

  } else {
    location.href = 'error-404.html';
  }
}
showAdmin();

// Функция добавляет фильмы из json файла, если не существует данных в локальном хранилище
async function getFimls() {
  const adminFilms = await (await fetch('./src/dummy_data/admin-films.json')).json();
  storageData = JSON.parse(localStorage.getItem('admin-films'));
  
  if (!storageData) { localStorage.setItem('admin-films', JSON.stringify(adminFilms)); }
}
getFimls();

// Функция заполняет select жанрами для выбора
async function getGenres() {
  const apiKey = '96f5267da6e441141dfe8db15267079b';
  let language = 'ru-RU';
  const genresArray = await (await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${language}`)).json();
  
  genresArray.genres.map(genre => {
    const select = document.querySelector('.form-add-film__select-list');
    let newElement = document.createElement('option');
    
    newElement.className = "form-add-film__select-item";
    newElement.value = genre.id;
    newElement.innerText = genre.name;
    select.append(newElement);
  });
}
getGenres();

// Функция добавляет фильм в локальное хранилище
async function addFilm() {
  const inputFields = document.querySelectorAll('.form-add-film__input');
  const textareaFields = document.querySelectorAll('.form-add-film__textarea');
  const selectFields = document.querySelectorAll('.form-add-film__select-list');
  const checkboxField = document.querySelectorAll('.form-add-film__checkbox');
  const allFields = [inputFields, textareaFields, selectFields, checkboxField];

  let newFilm = {
    movieList: [
      {
        id: "434355",
        title: "",
        overview: "",
        poster_path: "",
        popularity: 0,
        release_date: "",
        genre_ids: [],
        vote_average: 0,
        vote_count: 0,
        adult: false,
        new: true
      }
    ]
  }

  // Проходим по всем массивам и собираем данные в объект newFilm
  allFields.map(field => {
    field.forEach(element => {
      if (element.name === 'title') { newFilm.movieList[0].title = '(A+N) ' + element.value; }
      if (element.name === 'overview') { newFilm.movieList[0].overview = element.value; }
      if (element.name === 'poster') { newFilm.movieList[0].poster_path = element.value; }
      if (element.name === 'popularity') { newFilm.movieList[0].popularity = +element.value; }
      if (element.name === 'release-date') { newFilm.movieList[0].release_date = element.value; }
      
      if (element.name === 'genres') {
        let genresArray = [];
        for (let i = 0; i < element.children.length; i++) {
          if (element.children[i].selected) { genresArray.push(+element.children[i].value); }
        }
        newFilm.movieList[0].genre_ids = genresArray;
      }
      
      if (element.name === 'vote-average') { newFilm.movieList[0].vote_average = +element.value; }
      if (element.name === 'vote-count') { newFilm.movieList[0].vote_count = +element.value; }
      if (element.name === 'adult') { newFilm.movieList[0].adult = element.checked; }
    });
  });

  // Добавляем запись в local storage
  let storageFilms = JSON.parse(localStorage.getItem('admin-films'));

  if (storageFilms) {
    storageFilms.movieList.unshift(newFilm.movieList[0]);
    localStorage.setItem('admin-films', JSON.stringify(storageFilms));
  } else {
    localStorage.setItem('admin-films', JSON.stringify(newFilm));
  }

  document.querySelector('.add-film__form').reset();
}

// Обрабатываем клик по submit
document.querySelector('.form-add-film__button:first-child').addEventListener('click', evnt => {
  if (validationFields(evnt.target.closest('form'))) {
    addFilm();
  }
});

// Обрабатываем нажатие по enter
document.querySelector('.add-film__form').addEventListener('keydown', keyEvent => {
  const input = keyEvent.target.classList.contains('form-add-film__input');
  const select = keyEvent.target.classList.contains('form-add-film__select-list');
  if (keyEvent.keyCode === 13 && (input || select)) {
    if (validationFields(keyEvent.target.closest('form'))) {
      addFilm();
    }
  }
});
// Удаление
async function removeFilm(idFilm, parent) {
  const apiDeleteFlag = await apiDelete(idFilm);
  const localDeleteFlag = localDelete(idFilm);
  if (apiDeleteFlag || localDeleteFlag) {
    if (parent) { parent.remove(); }
  }
}

// Функция удаляет данные на сервере
async function apiDelete(id) {
  const apiKey = '96f5267da6e441141dfe8db15267079b';
  const accessToken = "7ed8ee79865972d8513f51f0dae3358282230f3e";
  const list = '7095546';

  let delFilm = {
    "media_id": id
  }

  let request = await (await fetch(`https://api.themoviedb.org/3/list/${list}/remove_item?api_key=${apiKey}&session_id=${accessToken}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(delFilm)
  })).json();

  // Ответ от сервера не корректный, он удаляет фильм, но возвращает false. Поэтому проверка на status_code.
  return request.status_code === 11;
}

// Функция удаляет данные из local storage
function localDelete(id) {
  let localFilms = JSON.parse(localStorage.getItem('admin-films'));
  let flag = false;
  
  if (localFilms) {
    for (let i = 0; i < localFilms.movieList.length; i++) {
      if (localFilms.movieList[i].id === id) {
        localFilms.movieList.splice(i, 1);
        localStorage.setItem('admin-films', JSON.stringify(localFilms))
        flag = true;
      }
    }
  }
  return flag;
}
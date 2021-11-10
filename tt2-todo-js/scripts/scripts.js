// Загрузка задач из хранилища
if (localStorage.getItem('SENLA-tasks')) { loadData(); }

// Добавляем троеточие при загрузке страницы
addEllipsis();

// Проверка размера окна по ширине, для добавления троеточия
let flagResolution = false;
window.addEventListener('resize', event => {
  if (event.target.innerWidth > 479 && !flagResolution) {
    addEllipsis();
    flagResolution = true;
  }
  if (event.target.innerWidth <= 479 && flagResolution) {
    addEllipsis();
    flagResolution = false;
  }
});


// Использование clamp для добавления троеточия после 4 или 2 строки
function addEllipsis() {
  let module = document.querySelector('.tasks__list').children;
  for (let i = 0; i < module.length; i++) {
    window.innerWidth >= 480 ? 
    clamp(module[i].querySelector('.tasks__text'), {clamp: 4}) :
    clamp(module[i].querySelector('.tasks__text'), {clamp: 2});
  }
}


// Активируем поиск по клавише enter
function findEnterKey(key) {
  if (key.keyCode === 13) {
    key.preventDefault();
    findInTasks();
  }
}


// Поиск
function findInTasks() {
  let tasksList = document.querySelector('.tasks__list').children;
  let searchValue = document.querySelector('.header__search-field').value.toLowerCase();
  
  if (searchValue) {
    for(let children of tasksList) {
      let childrenText = children.querySelector('.tasks__text').childNodes[1].textContent.toLowerCase();
      if (childrenText.indexOf(searchValue) === -1) {
        children.style.display = "none";
      }
    }
  }
}


// Функция сортировки задач.
function sorting(tag) {
  let tagText = tag.target.innerText;
  let list = document.querySelector('.tasks__list');
  let addForm = document.querySelector('.tasks__form').classList;

  // Стиль кнопки не будет спадать при потере фокуса
  for(let children of tag.target.parentNode.children) {
    if (children === tag.target) {
      if (!children.classList.contains('active')) { children.classList.add('active'); }
    } else {
      children.classList.remove('active');
    }
  }

  // Проверка, какая из кнопок нажата и сортировка
  if (tagText === 'All') {
    if (addForm.contains('display-none')) { addForm.remove('display-none'); }

    for (let i = 0; i < list.children.length; i++) {
      list.children[i].removeAttribute('style');
      list.children[i].querySelector('.tasks__button-important').removeAttribute('style');
    }
  } else if (tagText === 'Active') {
    if (addForm.contains('display-none')) { addForm.remove('display-none'); }

    for (let i = 0; i < list.children.length; i++) {
      if (list.children[i].classList.contains('active')) {
        list.children[i].removeAttribute('style');
        list.children[i].querySelector('.tasks__button-important').removeAttribute('style');
      } else {
        list.children[i].style.display = "none";
        list.children[i].querySelector('.tasks__button-important').removeAttribute('style');
      }
    }
  } else if (tagText === 'Done') {
    if (!addForm.contains('display-none')) { addForm.add('display-none'); }

    for (let i = 0; i < list.children.length; i++) {
      if (list.children[i].classList.contains('done')) {
        list.children[i].removeAttribute('style');
        list.children[i].querySelector('.tasks__button-important').style.display = 'none';
      } else {
        list.children[i].style.display = "none";
      }
    }
  }
  findInTasks();
}


//Добавление новой заметки по кнопке add
function addTask () {
  let textArea = document.querySelector('.form__textarea');
  let taskText = textArea.value.trim();

  if (taskText) {
    let taskList = document.querySelector('.tasks__list');
    let taskElement = document.createElement('li');
    
    taskElement.className = "tasks__items active";
    taskElement.setAttribute('tabIndex', 0);
    taskElement.innerHTML = `
      <p class="tasks__text" title="${taskText}"><span class="tasks__star">&star;</span>${taskText}</p>
      <button class="tasks__button-important">mark important</button>
      <button class="tasks__button-delete"></button>
    `;
    taskList.prepend(taskElement);
    textArea.value = '';
  } else {
    textArea.value = '';
  }
  saveData();
  addEllipsis();
}


//Изменение состояния активности.
function activity(tag) {
  let tagParent = tag.target.parentNode;
  let tagClassList = tag.target.classList;
  
  if (tagClassList.contains('tasks__text')) {
    //Тернарник
    tagParent.classList.contains('active') ?
    tagParent.classList.replace('active', 'done') :
    tagParent.classList.replace('done', 'active');
  } else if (tagClassList.contains('tasks__button-important')) {
    tagParent.classList.toggle('important')
    
    if (tagParent.classList.contains('important')) {
      tagParent.querySelector('.tasks__button-important').innerText = 'not important';
    } else {
      tagParent.querySelector('.tasks__button-important').innerText = 'mark important';
    }    
  } else if (tagClassList.contains('tasks__button-delete')) {
    tagParent.remove();
  }
  saveData();
}


//Сохранение и загрузука данных из локального хранилища
function saveData() {
  let tasksList = document.querySelector('.tasks__list').children;
  let dataToLocalStorage = [];

  for (let i = 0; i < tasksList.length; i++) {
    dataToLocalStorage[i] = [tasksList[i].className];
    dataToLocalStorage[i].push(tasksList[i].querySelector('.tasks__text').childNodes[1].textContent);
    dataToLocalStorage[i].push(tasksList[i].querySelector('.tasks__button-important').childNodes[0].textContent);
  }
  localStorage.setItem('SENLA-tasks', JSON.stringify(dataToLocalStorage));
}

function loadData() {
  let data = JSON.parse(localStorage.getItem('SENLA-tasks'));
  for (let i = 0; i < data.length; i++) {
    let taskList = document.querySelector('.tasks__list');
    let taskElement = document.createElement('li');

    taskElement.className = data[i][0];
    taskElement.setAttribute('tabIndex', 0);
    taskElement.innerHTML = `
      <p class="tasks__text" title="${data[i][1]}"><span class="tasks__star">&star;</span>${data[i][1]}</p>
      <button class="tasks__button-important">${data[i][2]}</button>
      <button class="tasks__button-delete"></button>
    `;
    taskList.append(taskElement);
  }
}
// Добавляем пользователя в local storage
function addNewUser() {
  const inputFields = document.querySelectorAll('.form-registration__input');
  let userData = {
    users: [
      {
        name: "",
        surname: "",
        password: "",
        email: "",
        access: "normal"
      }
    ]
  }

  inputFields.forEach(element => {
    if (element.name === 'name') { userData.users[0].name = element.value; }
    if (element.name === 'surname') { userData.users[0].surname = element.value; }
    if (element.name === 'password') { userData.users[0].password = element.value; }
    if (element.name === 'email') { userData.users[0].email = element.value; }
  });
  
  let storageData = JSON.parse(localStorage.getItem('users'));
  let activeUserData = { name: "", access: "" };
  
  if (storageData) {
    storageData.users.push(userData.users[0]);
    localStorage.setItem('users', JSON.stringify(storageData));

    activeUserData.name = userData.users[0].name;
    activeUserData.access = userData.users[0].access;
    localStorage.setItem('activeUser', JSON.stringify(activeUserData));
  } else {
    localStorage.setItem('users', JSON.stringify(userData));

    activeUserData.name = userData.users[0].name;
    activeUserData.access = userData.users[0].access;
    localStorage.setItem('activeUser', JSON.stringify(activeUserData));
  }
}

// Функция проверяет пароли на идентичность
function checkPassword() {
  const inputs = document.querySelectorAll('.form-registration__input');
  let password, passwordConfirmation;

  inputs.forEach(element => {
    if (element.name === 'password') { password = element.value; }
    else if (element.name === 'check-password') { passwordConfirmation = element.value; }
  });

  return password === passwordConfirmation;
}

// Функция сверяет данные из баз с пользователями если найден false, иначе true
async function checkingUserExistence(key, value) {
  const jsonTemp = await (await fetch('./src/dummy_data/users.json')).json();
  const storageTemp = JSON.parse(localStorage.getItem('users'));

  if (key === 'name') {
    if (jsonTemp.users.some(element => element.name === value)) {
      return false;
    }
    else {
      if (storageTemp) { return !storageTemp.users.some(element => element.name === value); }
    }
  } else if (key === 'email') {
    if (jsonTemp.users.some(element => element.email === value)) {
      return false;
    }
    else {
      if (storageTemp) { return !storageTemp.users.some(element => element.email === value); }
    }
  }

  return true;
}

// Прохождение валидации всех полей. Функция validationField() берётся из файла validation.js
async function allValidation(comingEvent) {
  if (validationFields(comingEvent.target.closest('form'))) {
    const getNameField = document.getElementById('id-name');

    if (await checkingUserExistence('name', getNameField.value)) {
      if (checkPassword()) {
        const getEmailField = document.getElementById('id-email');
        
        if (await checkingUserExistence('email', getEmailField.value)) {
          addNewUser();
          location.href = "index.html";
        } else {
          getEmailField.parentElement.querySelector('.form-registration__label-error-alt').classList.add('show-error');
        }
      } else {
        const inputCheckPassword = document.getElementById('id-check-password');
        inputCheckPassword.parentElement.querySelector('.form-registration__label-error').classList.add('show-error');
      }
    } else {
      getNameField.parentElement.querySelector('.form-registration__label-error-alt').classList.add('show-error');
    }
  }
}

if (document.querySelector('.registration__form')) {  
  // Добавляем по submit пользователя, если валидация прошла успешно
  document.querySelector('.form-registration__button:first-child').addEventListener('click', evnt => {
    allValidation(evnt);
  });

  // Добавляем по enter пользователя, если валидация прошла успешно
  document.querySelector('.registration__form').addEventListener('keydown', keyEvent => {
    const input = keyEvent.target.classList.contains('form-registration__input');
    if (keyEvent.keyCode === 13 && input) {
      allValidation(keyEvent);
    }
  });
}


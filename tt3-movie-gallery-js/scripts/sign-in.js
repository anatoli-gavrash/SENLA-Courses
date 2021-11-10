// Функция авторизации для страницы sign-in
async function userAuthorization() {
  const inputFields = document.querySelectorAll('.form-sign-in__input');
  let email, password, answerEmail, answerPassword;
  
  inputFields.forEach(element => {
    if (element.name === 'email') { email = element.value; }
    if (element.name === 'password') { password = element.value; }
  });
  
  await getUsers('email', email).then(result => answerEmail = result);
  
  if (answerEmail[0]) {
    await getUsers('password', password, answerEmail).then(result => answerPassword = result);  

    if (answerPassword[0]) {
      let userData = { name: "", access: "" };

      if (answerPassword[1] === 'json') {
        const temp = await (await fetch('./src/dummy_data/users.json')).json();
        userData.name = temp.users[answerPassword[2]].name;
        userData.access = temp.users[answerPassword[2]].access;
      } else if (answerPassword[1] === 'local') {
        const tempStorage = JSON.parse(localStorage.getItem('users'));
        userData.name = tempStorage.users[answerPassword[2]].name;
        userData.access = tempStorage.users[answerPassword[2]].access;
      }
      
      localStorage.setItem('activeUser', JSON.stringify(userData));
      location.href = "index.html";
    } else {
      document.getElementById('id-password').nextElementSibling.classList.add('show-error');
    }
  } else {
    document.getElementById('id-email').nextElementSibling.classList.add('show-error');
  }
}

// Функция принимает строку для поиска по users.json и local storage
async function getUsers(key, value, array) {
  const request = await (await fetch(`./src/dummy_data/users.json`)).json();
  const storage = JSON.parse(localStorage.getItem('users'));
  let returnArray = [];
  
  if (key === 'email') {
    if (request.users.some(element => element.email === value)) {
      request.users.map((element, index) => {
        if (element.email === value) {
          returnArray = [true, 'json', index];
        }
      });
    } else {
      if (storage) {
        if (storage.users.some(element => element.email === value)) {
          storage.users.map((element, index) => {
            if (element.email === value) {
              returnArray = [true, 'local', index];
            }
          });
        } else {
          returnArray = [false];
        }
      } else {
        returnArray = [false];
      }
    }
    return returnArray;
  }
  else if (key === 'password') {
    returnArray = array;
    if (array[1] === 'json') {
      returnArray[0] = request.users[array[2]].password === value;
    } else if (array[1] === 'local') {
      returnArray[0] = storage.users[array[2]].password === value;
    } else {
      returnArray = [false];
    }
    return returnArray;
  }

  return returnArray = [false];
}

// Обработка по поля энтеру проверяется на валидацию. Функция validationField() берётся из файла validation.js
if (document.querySelector('.sign-in__form')) {
  const signInForm = document.querySelector('.sign-in__form');
  
  // Вызов проверки по кнопке submit
  signInForm.addEventListener('click', evnt => {
    const submitButton = evnt.target.classList.contains('form-sign-in__button-submit');
    
    if (submitButton) {
      const validation = validationFields(evnt.target.closest('form'));

      if (validation) {
        userAuthorization();
      }
    }
  });
  
  // Вызов проверки по кнопке enter
  signInForm.addEventListener('keydown', keyEvent => {
    if (keyEvent.keyCode === 13) {
      const input = keyEvent.target.classList.contains('form-sign-in__input');
      const validation = validationFields(keyEvent.target.closest('form'));
      
      if (input && validation) {
        userAuthorization();
      }
    }
  });
}
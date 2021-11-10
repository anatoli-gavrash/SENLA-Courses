// Добавляем имя пользователя и меняем кнопку на logout
function getActiveUser() {
  const signInButton = document.querySelector('.header__sign-in');
  const logoutButton = document.querySelector('.header__logout');
  const userTag = document.querySelector('.header__user-name');
  const user = JSON.parse(localStorage.getItem('activeUser'));
  
  if (userTag.children[0].nextSibling) {
    userTag.children[0].nextSibling.textContent = '';
  }

  if (user) {
    userTag.innerHTML += user.name;
    signInButton.classList.remove('button-enable');
    logoutButton.classList.add('button-enable');
    
  } else {
    logoutButton.classList.remove('button-enable');
    signInButton.classList.add('button-enable');
  }
  
}
getActiveUser();

// При клике на логаут выходим и перезагружаем страницу
document.querySelector('.header__logout').addEventListener('click', evnt => {
  localStorage.removeItem('activeUser');
  getActiveUser();
  window.location.reload();
});
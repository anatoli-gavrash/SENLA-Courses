// Проверяет форму на встроенную валидацию и показывает ошибки.
function validationFields(grandpaOfInput) {
  const inputs = grandpaOfInput.querySelectorAll('input');
  const textareas = grandpaOfInput.querySelectorAll('textarea');
  const selects = grandpaOfInput.querySelectorAll('select');
  const elementArray = [inputs, textareas, selects];
  let validFlag = true;

  elementArray.map(arrayElement => {
    arrayElement.forEach(element => {
      if (element.nextElementSibling) {
        if (!element.validity.valid) {
          element.nextElementSibling.classList.add('show-error');
          validFlag = false;
        } else {
          element.nextElementSibling.classList.remove('show-error');
          if (element.nextElementSibling.nextElementSibling) {
            element.nextElementSibling.nextElementSibling.classList.remove('show-error');
          }
        }
      }
    });
  });
  return validFlag;
}
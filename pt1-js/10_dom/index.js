document.addEventListener('DOMContentLoaded', function () {
  console.clear();
  // ваш код поместить тут
  console.log('DOM:');


  // 1)
  console.log('1) Создать функцию которая принимает два. Функция проверяет является ли первый элемент родителям для второго элемента isParent(parent, child) => true || false.');
  
  const task1_parentDomElement = 'body';
  const task1_childDomElement = 'div';
  
  function checkingParent(parent, child) {
    return document.querySelector(child).parentElement === document.querySelector(parent);
  }
  console.log(task1_parentDomElement + ' родитель ' + task1_childDomElement + '? -', checkingParent(task1_parentDomElement, task1_childDomElement));


  // 2)
  console.log('2) Найти элемент который находится перед списком ul.');
  console.log(document.querySelector('ul').previousElementSibling);


  // 3)
  console.log('3) Найти параграф и получить его текстовые содержимое.');
  console.log('Текстовое содержимое параграфа:\n' + document.querySelector('p').innerText);


  // 4)
  console.log('4) Создать функцию, которая принимает в качестве аргумента узел DOM и возвращает информацию виде объекта о типе узла, имени узла и количестве дочерних узлов.');

  const task4_domElement = document.querySelector('ul');

  function domElementInfo(element) {
    let newObject = {
      typeNode: element.nodeType,
      nameNode: element.nodeName,
      numberOfChildren: element.children.length,
    };
    return newObject;
  }
  console.log('Информация об объекте:', domElementInfo(task4_domElement));


  // 5)
  console.log('5) Найти список и добавить ему класс "list".');
  document.querySelector('ul').classList.add('list');
  console.log('У елемента ul class="' + document.querySelector('ul').classList.value + '"');
});
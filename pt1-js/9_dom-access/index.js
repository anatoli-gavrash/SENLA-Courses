console.clear();
console.log('Доступ к DOM:', '\n', '\n');

console.log('Получить и вывести в консоль:');

// 1)
console.log('1) head:');

let head = document.head;
let head2 = document.querySelector('head');
let head3 = document.getElementsByTagName('head');
console.log(head);
console.log(head2);
console.log(head3);

// 2)
console.log('2) body:');

let body = document.body;
let body2 = document.querySelector('body');
let body3 = document.getElementsByTagName('body');
console.log(body);
console.log(body2);
console.log(body3);

// 3)
console.log('3) Все дочерние элементы body:');

let firstBodyChildren = document.body.children;
let firstBodyChildren2 = document.querySelectorAll('body > *');
console.log(firstBodyChildren);
console.log(firstBodyChildren2);

// 4)
console.log('4) Первый div и все его дочерние узлы');

let divAndChildren = document.querySelectorAll('body div:first-child, body div:first-child > *');
console.log(divAndChildren);

  // 4.1)
  console.log('  4.1) Вывести все дочерние узлы в консоль');

  let divChildren = document.querySelectorAll('body div:first-child > *');
  console.log(' ', divChildren);

  // 4.2)
  console.log('  4.2) Вывести все дочерние узлы в консоль кроме первого');

  let divChildrenWithountFirst = document.querySelectorAll('body div:first-child *:nth-child(n+2)');
  console.log(' ', divChildrenWithountFirst);
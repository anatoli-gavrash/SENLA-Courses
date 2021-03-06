/* Придумать название для переменных, которые описывают (let, const)
1) имя (постоянное)
2) фамилия (постоянное)
3) возраст (может изменяться)
4) информация о пользователе ( может изменяться) */
const userFirstName;
const userLastName;
let userAge;
let userSomeInformation;



/* Что будет в консоли и почему: */

/* 1)
Будет undefined из-за особенности переменной var. 
Переменная var "всплывает" в начало нашего скрипта или функции, 
но значение присваивается в строке после вывода значения в консоль. */
console.log(test);
var test = 'string';

/* 2)
Выведет строку string 2. Во второй строке мы переопределяем переменную x.
В отличии от let переменная var с одинаковым именем может быть объявлена повторно.*/
var x = 'string';
var x = 'string 2';
console.log(x);

/* 3)
Будет ошибка, мы объявляем и присваиваем значение переменной позже, чем вызываем. 
В отличии от var, let не "всплывает". */
console.log(test);
let test = 'string';

/* 4)
Будет ошибка, в отличии от переменной var, let нельзя переобъявлять. */
let num = 12;
let num = 1;
console.clear();
console.log('Числа:', '\n');

// 1) 
console.log('1) Получить число Pi из Math и округлить его до двух знаков после точки:');
console.log('Число "Пи" с округлением до второго знака после запятой:', Math.PI.toFixed(2), '\n');

// 2) 
console.log('2) Найти максимальное и минимальное значения из представленного ряда 10, 17, 5, 12, 15, 99, 1:');
const arrayOfNumbers = [10, 17, 5, 12, 15, 99, 1];
console.log('Минимальное число в массиве:', Math.min(...arrayOfNumbers));
console.log('Максимальное число в массиве:', Math.max(...arrayOfNumbers), '\n'); 


// 3) 
console.log('3) С помощью Math.random:');
let min = 0;
let max = 10;

  // 3.1)  */
  console.log('  3.1) Получить случайное число и округлить его до двух цифр после запятой:');
  console.log('  Случайное число с округлением до второго знака после запятой:', (Math.random() * (max - min) + min).toFixed(2), '\n');
  
  // 3.2) 
  console.log('  3.2) Получить случайное число от 0 до Х:');

  function randomNumber(maxNumber) {
    return Math.random() * maxNumber;
  }
  console.log('  Случайное число от 0 до 10:', randomNumber(max), '\n');

// 4) 
console.log('4) Получить число из строки "100$":');
let string = '100$';

// Первый вариант. Вернёт число, если оно находится в начале строки.
console.log('Число из строки (число дожно быть в начале строки):', parseInt(string));
// Второй вариант. Вернёт первое попавшееся число, не зависит от позиции числа.
console.log('Число из строки (не зависит от позиции числа):', parseInt(string.match(/\d+/)));
// Третий вариант. Вернёт результат поиска в виде массива данных.
console.log('Число из строки (ищет все числа, результат в виде массива):', string.match(/\d+/g), '\n');
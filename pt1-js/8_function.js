console.clear();
console.log('Функции:', '\n', '\n');


// 1) -------------------------------------------------------------------------
console.log('1) Создать функцию multiply, которая будет принимать любое количество чисел ' + '\n' +
            'и возвращать их произведение: multiplay(1,2,3) = 6. Если нет ни одного аргумента вернуть ноль.', '\n');

const a = 1, b = 2, c = 3, d = 4, e = 5;

function multiply(...arrayOfNumbers) {
  let result = 1;
  if (arrayOfNumbers.length < 1) return 0;
  for (let i = 0; i < arrayOfNumbers.length; i++) {
    result *= arrayOfNumbers[i];
  }
  return result;
}
console.log('Входящие числа:', a, b, c, d, e)
console.log('Произведение чисел:', multiply(a, b, c, d, e), '\n', '\n');


// 2) -------------------------------------------------------------------------
console.log('2) С помощью рекурсии вычислить факториал числа 10.');

const task2_number = 10;

function calculatingFactorial(number) {
  return number === 1 ? 1 : calculatingFactorial(number - 1) * number;
}
console.log('Факториал числа', task2_number, 'равен:', calculatingFactorial(task2_number), '\n', '\n');


// 3) -------------------------------------------------------------------------
console.log('3) Создать функцию, которая принимает строку и возвращает перевернутую строку ("test") = "tset".', '\n');

const task3_string = 'test';

function reverseString(string) {
  let newString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    newString += string[i];
  }
  return newString;
}
console.log('Входящая строка:', task3_string);
console.log('Перевёрнутая строка:', reverseString(task3_string), '\n', '\n');


// 4) -------------------------------------------------------------------------
console.log('4) Написать функцию, которая проверяет является ли слово палиндромом', '\n');

const task4_string = 'saippuakivikauppias';

function findPalindrome(string) {
  if (string.length % 2 !== 0) {
    for (let i = 0; i < string.length / 2; i++) {
      if (string[i] !== string[string.length - 1 - i]) {
        return 'Нет.'; 
      }
    }
  } else { 
    return 'Нет.'; 
  }
  return 'Да.';
}
console.log('Слово "' + task4_string + '" палиндром? -', findPalindrome(task4_string), '\n', '\n');


// 5) -------------------------------------------------------------------------
console.log('5) Создать функцию, которая в качестве аргумента принимает строку ' + '\n' +
            'из букв и возвращает строку, где каждый символ разделен пробелом ' + '\n' +
            'и заменён на значение символа из юникода. ((hello) => "104 101 108 108 111")', '\n');

const task5_string = 'hello';

function stringToUnicode(string) {
  let newString = '';
  for (let i = 0; i < string.length; i++) {
    newString += string[i].charCodeAt();
    if (i !== string.length - 1) { newString += ' '; }
  }
  return newString;
}
console.log('Вид строки', task5_string, 'в юникод кодировке будет:', stringToUnicode(task5_string), '\n', '\n');


// 6)
console.log('6) Написать функцию-рекурсию, которая выведет каждый символ строки в конcоль ("test") => "t" "e" "s" "t"', '\n');

const task6_string = 'test';

function stringToChar(string, count) {
  if (count < string.length) {
    console.log(string[count]);
    count++;
    stringToChar(string, count);
  }
  return string;
}
console.log('Вывод строки посимвольно:');
stringToChar(task6_string, 0);

// 6) Альтернативное решение
let task6_arr = [];
function stringToCharAlt(string, count, array) {
  if (count < string.length) {
    array[count] = string[count];
    count++;
    stringToCharAlt(string, count, array);
  }
  return array;
}
console.log('Вывод стоки массивом:', stringToCharAlt(task6_string, 0, task6_arr), '\n', '\n');


/* -------------------------------------------------------------------------
7) Создать две функции и дать им осмысленные названия:
   7.1) первая функция принимает массив и callback, возвращая строку из обработанного массива.
   7.2) вторая функция (callback) обрабатывает каждый элемент массива */
console.log('7) Создать две функции и дать им осмысленные названия:' + '\n' +
            '  7.1) первая функция принимает массив и callback, возвращая строку из обработанного массива.' + '\n' +
            '  7.2) вторая функция (callback) обрабатывает каждый элемент массива.', '\n')

const task7_array = ['a', 1, 4, 'b', 'd', 43, 'm'];

function arrayToString(array, callback) {
  return callback(array).join('');
}

function arrayProcessing(incomingArray) {
  let newArray = incomingArray.map(arrayElement => {
    // Тут что-то делаем с полученными элементами массива.
    return arrayElement + '!';
  });
  return newArray;
}
console.log('Результирующая строка. В каждый элемент добавлен "!" (для примера):', arrayToString(task7_array, arrayProcessing), '\n');
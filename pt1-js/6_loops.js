console.clear();
console.log('Циклы:', '\n');


// 1) -------------------------------------------------------------------------
console.log('1) В строке "Я стану крутым программистом" сделать первую букву каждого слова в верхнем регистре:', '\n');

const task1_hope = 'Я стану крутым программистом';

function juniorHope(hope) {
  let newHope = '';
  for (let i = 0; i < hope.length; i++) {
    if (i === 0 && hope[i] !== ' ') {
      newHope += hope[i].toUpperCase();
    } else if (i < hope.length - 1 && hope[i] === ' ' && hope[i + 1] != ' ') {
      newHope += hope[i];
      newHope += hope[i + 1].toUpperCase();
      i++;
    } else {
      newHope += hope[i];
    }
  }
  return newHope;
}
console.log('Результирующая строка:', juniorHope(task1_hope));

// 1) Альтернативный вариант через slice()
function juniorHopeAlt(hope) {
  for (let i = 0; i < hope.length; i++) {
    if (i === 0 && hope[i] !== ' ') {
      hope = hope[i].toUpperCase() + hope.slice(i + 1);
    } else if (i < hope.length - 1 && hope[i] === ' ' && hope[i + 1] != ' ') {
      hope = hope.slice(0, i + 1) + hope[i + 1].toUpperCase() + hope.slice(i + 2);
      i++;
    }
  }
  return hope;
}
console.log('Альтернативная результирующая строка:', juniorHopeAlt(task1_hope), '\n', '\n');


// 2) -------------------------------------------------------------------------
console.log('2) Вычислить факториал числа 9 (факториал числа - это произведение всех' + '\n' +
            'натуральных чисел от 1 до n включительно. например, 2! = 21 или 6! = 6*5*4*3*2*1).', '\n');

const task2_value = 9;

function findFactorial (value) {
  let summ = 1;
  for (let i = 1; i <= value; i++) {
    summ *= i;
  }
  return summ;
}
console.log('Факториал числа', task2_value, 'равен:', findFactorial(task2_value), '\n', '\n');


// 3) -------------------------------------------------------------------------
console.log('3) Создать строку "Просветление наступит через: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1".', '\n');

const task3_string = 'Просветление наступит через: ';

function enlightenment (string) {
  for (let i = 10; i > 0; i--) {
    string += i;
    if (i > 1) {
      string += ', ';
    }
  }
  return string;
}
console.log('Результат цикла:', enlightenment(task3_string), '\n', '\n');


// 4) -------------------------------------------------------------------------
console.log('4) Найти и вывести в консоль все нечетные числа от 1 до 20 включительно.', '\n');

function findOddNumbers () {
  let oddNumbers = [];
  for (let i = 1; i <= 20; i++) {
    if (i % 2 !== 0) {
      oddNumbers.push(i);
    }
  }
  return oddNumbers;
}
console.log('Список нечетных чисел:', findOddNumbers(), '\n', '\n');


// 5) -------------------------------------------------------------------------
console.log('5) На основе строки "теперь я мастер циклов javascript" создать новую строку,' + '\n' +
            'где первые буквы каждого слова будут в верхнем регистре и будут отсутствовать пробелы.', '\n');

const task5_string = 'теперь я мастер циклов javascript';

function noSpaceString (string) {
  let newString = '';
  for (let i = 0; i <= string.length - 1; i++) {
    if (i === 0 && string[i] !== ' ') {
      newString += string[i].toUpperCase();
      if (string[i + 1] !== ' ') {
        newString += string[i + 1].toUpperCase();
        i++;
      }
    } else if (i < string.length - 2 && string[i] === ' ' && string[i + 1] != ' ') {
      newString += string[i + 1].toUpperCase();
      i++;
      if (string[i + 1] != ' ') {
        newString += string[i + 1].toUpperCase();
        i++;
      }
    } else if (i < string.length - 1 && string[i] === ' ' && string[i + 1] != ' ') {
        newString += string[i + 1].toUpperCase();
        i++;
    } else {
      newString += string[i];
    }
  }
  return newString.trim();
}
console.log('Результирующая строка:', noSpaceString(task5_string), '\n');
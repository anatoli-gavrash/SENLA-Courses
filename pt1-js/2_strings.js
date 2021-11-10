console.clear();
console.log('Строки:', '\n');

let string = 'string test example';
console.log('Исходная строка:', string, '\n');

// 1)
console.log('1) Получить первую и последнюю букву строки:');
console.log('Первый символ:', string[0]);
console.log('Последний симвов:', string[string.length - 1], '\n');

// 2)
console.log('2) Сделать первую и последнюю буквы в верхнем регистре:');
console.log('Итоговая строка:', string[0].toUpperCase() + 
            string.slice(1, string.length - 1) + 
            string[string.length - 1].toUpperCase(), '\n');

// 3)
console.log('3) Найти положение слова string в строке:');
console.log('Начальная позиция слова "string" (по индексу):', string.indexOf('string'));
console.log('Начальная позиция слова "string" (по порядку):', string.indexOf('string') + 1, '\n');

// 4)
console.log('4) Найти положение второго пробела:');

let spaceNumber = 2;

function findSpace(innerString, number) {
  for (let index = 0; index < innerString.length; index++) {
    if (innerString[index] === ' ' && number !== 0) {
      number--; 
      if (number === 0) {
        return index;
      }
    }
  }
  return 'Строка закончилась раньше.';
}
console.log('Расположение второго пробела (по индексу):', findSpace(string, spaceNumber));

// 5)
console.log('5) Получить строку со 2-ого символа длинной 6 букв:');
console.log('Строка, начиная со второй буквы:', string.match(/[a-zA-Zа-яА-ЯёЁ]/g).join("").substr(1, 6), '\n');

// 6)
console.log('6) Получить строку с 1 по 7 символ:');
console.log('Строка с 1-го по 7-ой символ:', string.slice(0, 7), '\n');

// 7)
console.log('7) Получить из двух переменных типа number x = 20, y = 21 получить строку "2021":');
let x = 20;
let y = 21;
console.log('Строка из двух переменных "20" и "21":', `${x}${y}`, '\n');
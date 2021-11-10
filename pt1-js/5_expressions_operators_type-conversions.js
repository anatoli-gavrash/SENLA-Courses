console.clear();
console.log('Выражения и операторы. Преобразование типов:', '\n', '\n');


// 1) -------------------------------------------------------------------------
/* Задачу воспринял буквально и записал в виде вывода в консоль.
В реальности такая запись будет пытаться сложить "undefined" с числом и считаться ошибкой.
Кроме того, переменная "x" не может быть переобъявлена из-за особенности работы директивы let. */
console.log('1) Записать в коротком виде:', '\n');
function shortExpressions() {
  console.log('let a = a + 5       =>  ', 'let a += 5;');
  console.log('let b = b * 15      =>  ', 'let b *= 15;');
  console.log('let c = c - 3       =>  ', 'let c -= 3;');
  console.log('let d = d % 2       =>  ', 'let d %= 2;');
  console.log('let k = a + k       =>  ', 'let k += a;');
  console.log('let l = l * b       =>  ', 'let l *= b;');
  console.log('let m = m * 3 * k   =>  ', 'let m *= 3 * k;', '\n', '\n');
}
shortExpressions();


// 2) -------------------------------------------------------------------------
console.log('2) Возвести переменную в куб, используя краткую запись:', '\n');

const task2_cubeVar = 4;
function gettingCube(value) {
  return value ** 3;
}
console.log('Куб числа', task2_cubeVar, 'равен:', gettingCube(task2_cubeVar), '\n', '\n');


// 3) -------------------------------------------------------------------------
console.log('3) Если переменная равна “маленький”, присвоить ей значение “большой”, ' + '\n' +
            'иначе “маленький”. Сделать тоже самое, используя тернарный оператор.', '\n');

const task3_size = 'маленький';

console.log('С использованием оператора "if":');
function smallOrBig (size) {
  if (size === 'маленький') {
    size = 'большой';
  } else {
    size = 'маленький';;
  }
  return size;
}
console.log('Базовый размер:', task3_size);
console.log('Размер после изменения:', smallOrBig(task3_size), '\n');

console.log('С использованием тернарного оператора:');
function smallOrBigAlt(size) {
  return size === 'маленький' ? 'большой' : 'маленький';
}
console.log('Базовый размер:', task3_size);
console.log('Размер после изменения:', smallOrBigAlt(task3_size), '\n', '\n');


// 4) -------------------------------------------------------------------------
console.log('4) Записать условие, используя условный оператор if: ' + '\n' +
            'если переменная меньше нуля: присвоить ей строку “меньше нуля” ' + '\n' +
            'если переменная равна нулю: присвоить “1” ' + '\n' +
            'если больше нуля: используя краткую запись, умножить переменную на “10” ' + '\n' +
            'Сделать тоже самое, используя тернарный оператор:', '\n');

const task4_variable = 5;

console.log('С использованием оператора "if":')
function moreLessEqual(variable) {
  if (variable < 0) {
    variable = 'меньше нуля';
  } else if (variable > 0) {
    variable *= 10;
  } else {
    variable = 1;
  }
  return variable;
}
console.log('Переменная равна:', task4_variable);
console.log('Результат вычислений:', moreLessEqual(task4_variable), '\n');

console.log('С использованием тернарного оператора:')
function moreLessEqualAlt(variable) {
  variable = variable < 0 ? 'меньше нуля' :
             variable > 0 ? variable *= 10 :
             1;
  return variable;
}
console.log('Переменная равна:', task4_variable);
console.log('Результат вычислений:', moreLessEqualAlt(task4_variable), '\n', '\n');


// 5) -------------------------------------------------------------------------
console.log('5) Используя конструктор switch, записать следующее условие:' + '\n' +
            'if (a == "котик") { console.log("котик"); }' + '\n' +
            'else if (a == "собака") { console.log("собака"); }' + '\n' +
            'else if (a == "хомячок") { console.log("хомячок"); }' + '\n' +
            'else { console.log("неизвестное науке животное"); }' + '\n' +
            'Важно: в консоли вы должны увидеть только одно условие из 4х.', '\n');

const task5_animal = 'котик';

function typeOfAnimals(animal) {
  switch(animal) {
    case 'котик': 
      console.log('Найден: котик');
      break;
    case 'собака': 
      console.log('Найдена: собака');
      break;
    case 'хомячок': 
      console.log('Найден: хомячок');
      break;
    default :
      console.log('Неизвестное науке животное');
  }
}
console.log('Вид животного в переменной:', task5_animal);
typeOfAnimals(task5_animal);
console.log('\n');


// 6) -------------------------------------------------------------------------
console.log('6) Чему равен x в каждом из примеров, объясните почему:');
function logicalOperators () {
  console.log('let x = 0 || "строка"   -> ', 'x = "строка". (0 = false, не пустая строка = true. Оператор "или" венёт первый попавшийся true.)');
  console.log('let x = 1 && "строка"   -> ', 'x = "строка". (1 = true, не пустая строка = true. Оператор "и" вернёт последний true.)');
  console.log('let x = null || 1"      -> ', 'x = 1. (null = false, 1 = true. Оператор "или" вернёт первый попавшийся true.)');
  console.log('let x = null && 1"      -> ', 'x = null. (null = false, 1 = true. Оператор "и" вернёт первый попавшийся false.)');
  console.log('let x = 1 && null"      -> ', 'x = null. (1 = true, null = false. Оператор "и" вернёт первый попавшийся false.)');
  console.log('let x = null || 0 || 1" -> ', 'x = 1. (null = false, 0 = false, 1 = true. Оператор "или" венёт первый попавшийся true.)');
  console.log('let x = null && 0 && 1" -> ', 'x = null. (null = false, 0 = false, 1 = true. Оператор "и" вернёт первый попавшийся false.)', '\n', '\n');
}
logicalOperators();


// 7) -------------------------------------------------------------------------
console.log('7) Чему равен x в каждом из примеров, объясните почему:');
function additionOfDifferentTypes() {
  console.log('let x = 1 + 2 + "3"       ->', 'x = Строка "33". (1 + 2 = 3 - арифметическая операция. 3 + "3" = "33" - конкатенация, т.к. "3" является строкой.)');
  console.log('let x = 1 + 2 - "1"       ->', 'x = Число 2. (1 + 2 = 3 - арифметическая операция. 3 - "1" = 2 - в данном случае строка "1" преобразуется в число 1.)');
  console.log('let x = "1" + 2 - 1       ->', 'x = Число 11. ("1" + 2 = строка "12" - конкатенация. "12" - 1 = 11 - арифметическая операция. Строка "12" преобразуется в число.)');
  console.log('let x = true + 1          ->', 'x = Число 2. (true - булевая переменная true преобразуется в число 1 и складывается с правым операндом.)');
  console.log('let x = +"1" + 2          ->', 'x = Число 3. (+"1" - унарный плюс преобразует строку "1" в число, после чего складывается с правым операндом.)');
  console.log('let x = null + 2          ->', 'x = Число 2. (null - преобразуется в число 0 и складывается с правым операндом.)');
  console.log('let x = undefined + 2     ->', 'x = Число NaN. (undefined - при преобразовании становится NaN. Любая арифметическая операция с NaN вернёт NaN.)');
  console.log('let x = true + undefined  ->', 'x = Число NaN. (true - преобразуется в 1, undefined - преобразуется в NaN. Любая арифметическая операция с NaN вернёт NaN.)', '\n');
}
additionOfDifferentTypes();
console.clear();
console.log('Массивы:', '\n', '\n');


// 1) -------------------------------------------------------------------------
console.log('1) Используя функцию, найти последний элемент массива, не изменяя его.', '\n');

const task1_array = ['a', 'b', 'c', 'd', 'e', 'f'];

function findLastArrayElement(array) {
  return array[array.length - 1];
}
console.log('Входящий массив:', task1_array);
console.log('Последний элемет массива:', findLastArrayElement(task1_array), '\n', '\n');


// 2) -------------------------------------------------------------------------
console.log('2) Создать такую функцию, которая принимала бы массив [1,3,6], а возвращала новый массив с дублированными элементами [1,3,6,1,3,6].', '\n');

const task2_array = [1, 3, 6];

function duplicateArrayElements(array) {
  return array.concat(array);
}
console.log('Входящий массив:', task2_array);
console.log('Результирующий массив:', duplicateArrayElements(task2_array), '\n', '\n');


// 3) -------------------------------------------------------------------------
console.log('3) Создать такую функцию, которая принимала бы любое число, а возвращала массив, заполненный числами от 1 до n.', '\n');

const task3_number = 6;

function createNewArray(maxNumber) {
  let newArray = [];
  for (let i = 0; i < maxNumber; i++) {
    newArray[i] = i + 1;
  }
  return newArray;
}
console.log('Массив чисел от', 1, 'до', task3_number, ":", createNewArray(task3_number), '\n');

// 3) Запись в декларативном стиле.
function createNewArrayAlt (maxNumber) {
  return new Array(maxNumber).fill(0).map((element, index) => index + 1);
}
console.log("Вариант в декларативном стиле:", createNewArrayAlt(task3_number), '\n', '\n');


// 4) -------------------------------------------------------------------------
console.log('4) Создать такую функцию, которая принимала бы любое число массивов ' + '\n' +
            'и удаляла из каждого массива первый элемент, а возвращала массив ' + '\n' +
            'оставшихся значений ([1, 2, 3], ["x", "y", "z"] → [[2, 3], ["y", "z"]])".', '\n');

const task4_array1 = [1, 2, 3];
const task4_array2 = [4, 5, 6];
const task4_array3 = [7, 8, 9];
const task4_array4 = [10, 11, 12];

function deleteFirstArrayElements(...array) {
  return array.map((arr) => arr.slice(1, array.length));
}
console.log('Входящие массивы:', task4_array1, task4_array2, task4_array3, task4_array4);
console.log('Результирующий массив массивов:', deleteFirstArrayElements(task4_array1, task4_array2, task4_array3, task4_array4), '\n', '\n');


// 5) -------------------------------------------------------------------------
console.log('5) Создать функцию, которая упорядочит буквы в строке "екважбигёзд" ' + '\n' +
'в алфавитном порядке и возвратит строку в обратном порядке ("кизжёедгвба").', '\n');

const task5_string = 'екважбигёзд';

function reverseAlphabeticalOrder(string) {
  return string.split('').sort(sortFunction).join('');
}

function sortFunction(a, b) {
  var aCode = a.toLowerCase().replace('ё','е'+String.fromCharCode(1110));
  var bCode = b.toLowerCase().replace('ё','е'+String.fromCharCode(1110));
  return aCode > bCode ? -1 :
         aCode < bCode ? 1 :
         0;
}
console.log('Входящая строка:', task5_string);
console.log('Отсортированная строка:', reverseAlphabeticalOrder(task5_string));

// 5) Альтерантивный вариант
function reverseAlphabeticalOrdeAlt(string) {
  return string.split('').sort(sortFunctionAlt).reverse().join('');
}

function sortFunctionAlt(a, b) {
  let collator = new Intl.Collator();
  return collator.compare(a, b);
}
console.log('Альтернативная отсортированная строка:', reverseAlphabeticalOrdeAlt(task5_string), '\n', '\n');


// 6) -------------------------------------------------------------------------
console.log('6) Используя функцию, отсортировать массив [5, 2, -1, 6, 9, -9, 3] в обратном порядке.', '\n');

const task6_array = [5, 2, -1, 6, 9, -9, 3];

function reverseSortArray(array) {
  return array.sort(sortMethod).reverse();
}

function sortMethod(a, b) {
  return a - b;
}
console.log('Входящий массив:', task6_array);
console.log('Отсортированный массив: ', reverseSortArray(task6_array), '\n', '\n');


// 7 и 8) -------------------------------------------------------------------------
console.log('7 и 8) Создать функцию, которая принимает 3 аргумента: ' + '\n' +
            'любой произвольный массив начальный номер элемента в массиве конечный номер.');
console.log('Ваша функция должна вернуть новый массив, состоящий из элементов ' + '\n' +
            'исходного массива согласно аргументам ' + '\n' +
            '(с-по) (getNewArray(“а, б, в, г, д, е”, 1,3) → [б, в, г]), ' + '\n' +
            'не изменяя исходный массив и не используя циклы.', '\n');

const task7_array = ['а', 'б', 'в', 'г', 'д', 'е'];
let task7_firstNum = 1;
let task7_lastNum = 4;

function sliceArray(array, firstNumber, lastNumber) {
  return array.slice(firstNumber, lastNumber + 1);
}
console.log('Входящий массив и два числа (начало - конец):', task7_array, '(', task7_firstNum, '-', task7_lastNum,')');
console.log('Результирующий массив:', sliceArray(task7_array, task7_firstNum, task7_lastNum), '\n', '\n');


// 9) -------------------------------------------------------------------------
console.log('9) Удвоить элементы массива, не используя циклы.', '\n');

const task8_array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function doublingArrayElements(array) {
  return array.map(number => number * 2);
}
console.log('Входящий массив:', task8_array);
console.log('Результирующий массв:', doublingArrayElements(task8_array), '\n', '\n');


// 10) -------------------------------------------------------------------------
console.log('10) Удалить из массива [1, 2, 3, 4, 5] второй и третий элементы.', '\n');

const task9_array = [1, 2, 3, 4, 5];

function deleteArrayElements(array) {
  let newArray = [...array];
  newArray.splice(1, 2);
  return newArray;
}
console.log('Входящий массив:', task9_array);
console.log('Результирующий массив', deleteArrayElements(task9_array), '\n', '\n');


// 11) -------------------------------------------------------------------------
console.log('11) Удалить из массива [1, 2, 3, 4, 5] второй и третий элементы и на их место вставить “три” и “четыре” соответственно.', '\n');

const task10_array = [1, 2, 3, 4, 5];

function deleteAndInsertArrayElements(array) {
  let newArray = array.slice(0);
  newArray.splice(1, 2, 'три', 'четыре');
  return newArray;
}
console.log('Входящий массив:', task10_array);
console.log('Результирующий массив:', deleteAndInsertArrayElements(task10_array), '\n', '\n');


// 12) -------------------------------------------------------------------------
console.log('12) Вставить в произвольный массив любое значение после второго элемента.', '\n');

const task11_array = [1, 2, 3, 4, 5, 6];
const task11_value = 'value';

function insertThirdArrayElement(array, value) {
  let newArray = array.slice(0);
  newArray.splice(2, 0, value);
  return newArray;
}
console.log('Входящий массив, (добавляемое значение):', task11_array, '(', task11_value, ')');
console.log('Результирующий массив:', insertThirdArrayElement(task11_array, task11_value), '\n', '\n');


// 13) -------------------------------------------------------------------------
console.log('13) Отсортировать массив таким образом, чтобы вначале шли массивы с наименьшей длиной. Создать копию произвольного массива.', '\n');

const task12_array = [[1, 2, 3, 4, 5], [1, 2, 3], [1, 2, 3, 4, 5, 6], [1, 2], [1, 2, 3, 4]];

function sortArrays(array) {
  let newArray = [...array];
  return newArray.sort();
}
const task12_sortArrays = sortArrays(task12_array);

function getRandomArray(arrays) {
  let randomValue = Math.floor(Math.random() * arrays.length);
  return arrays[randomValue];
}
const task12_randomArrayCopy = getRandomArray(task12_sortArrays);

console.log('Входящий массив массивов:', task12_array, '\n');
console.log('Отсортированный массив массивов:', task12_sortArrays);
console.log('Случайный массив:', task12_randomArrayCopy, '\n', '\n');


// 14) -------------------------------------------------------------------------
console.log('14) Отсортировать массив объектов по возрастающему количеству ног животных: ' + '\n' +
            '[ {kind: "tarantula", info: {legs: 8, eyes: 8}}, ' + '\n' +
            '{kind: "french bulldog", info: {legs: 4, eyes: 2}}, ' + '\n' +
            '{kind: "human", info: {legs: 2, eyes: 2}}, ' + '\n' +
            '{kind: "lobster", info: {legs: 10, eyes: 2}}, ]', '\n');

const task13_objectArray = [{kind: "tarantula", info: {legs: 8, eyes: 8}}, 
  {kind: "french bulldog", info: {legs: 4, eyes: 2}}, 
  {kind: "human", info: {legs: 2, eyes: 2}}, 
  {kind: "lobster", info: {legs: 10, eyes: 2}}]

function sortObjects(array) {
  let newArray = array.slice(0);
  newArray.sort((first, second) => first.info.legs - second.info.legs);
  return newArray;
}
console.log('Отсортированный массив объектов:', sortObjects(task13_objectArray), '\n', '\n');


// 15) -------------------------------------------------------------------------
console.log('15) Написать функцию, которая принимает массив услуг и два числа, ' + '\n' +
            'представляющих собой время исполнения услуг, а также возвращает все услуги, ' + '\n' +
            'находящиеся в диапазоне времени исполнения и отсортированные от меньшего ' + '\n' +
            'времени исполнения к большему. ' + '\n' +
            'const services = [ {service: "service1", executionTime: 56}, ' + '\n' +
            '{service: "service2", executionTime: 97}, ' + '\n' +
            '{service: "service3", executionTime: 23}, ' + '\n' +
            '{service: "service4", executionTime: 65}, ' + '\n' +
            '{service: "service5", executionTime: 2}, ' + '\n' +
            '{service: "service6", executionTime: 73}, ' + '\n' +
            '{service: "service7", executionTime: 82}, ' + '\n' +
            '{service: "service8", executionTime: 19}, ' + '\n' +
            '{service: "service9", executionTime: 33}, ' + '\n' +
            '{service: "service10", executionTime: 42}, ] ' + '\n' +
            'Например, filterServices(services, 20, 60).', '\n');

const task14_services = [{service: "service1", executionTime: 56}, 
  {service: "service2", executionTime: 97}, 
  {service: "service3", executionTime: 23}, 
  {service: "service4", executionTime: 65}, 
  {service: "service5", executionTime: 2}, 
  {service: "service6", executionTime: 73}, 
  {service: "service7", executionTime: 82}, 
  {service: "service8", executionTime: 19}, 
  {service: "service9", executionTime: 33}, 
  {service: "service10", executionTime: 42}]
const task14_minValue = 10;
const task14_maxValue = 70;

function filterServices(array, minValue, maxValue) {
  let newServices = [];
  for (let i = 0, o = 0; i < array.length; i++) {
    if (array[i].executionTime >= minValue && array[i].executionTime <= maxValue) {
      newServices[o] = array[i];
      o++;
    }
  }
  return newServices.sort((first, second) => first.executionTime - second.executionTime);
}
console.log('(мин. - макс. значения), входящий массив:', '\n', '(', task14_minValue, '-', task14_maxValue, ')', task14_services);
console.log('Результирующий массив:', filterServices(task14_services, task14_minValue, task14_maxValue), '\n');
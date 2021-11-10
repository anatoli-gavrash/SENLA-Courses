console.clear();
console.log('Объекты:', '\n');

// 1) Создать объект с полем 'notebook' равным 'MacBook'
let computer = {
  notebook: 'MacBook',
};

/* 2) 
Добавить в объект из предыдущей задачи поле 'price', 
равное 1500 и поле currency, равная 'dollar' */
computer.price = 1500;
computer.currency = 'dollar';

/* 3) 
Добавить поле details, которое будет содержать объект 
с полями model и color (значения этих полей задайте сами) */
computer.details = {
  model: 'Apple MacBook Pro 13" Touch Bar 2020 512GB / MWP72',
  color: 'silver',
};

// Вывод результата
console.log('Результирующий объект:', computer, '\n');
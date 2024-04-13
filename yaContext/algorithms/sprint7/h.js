//https://contest.yandex.ru/contest/25596/problems/H/ 

/**
 * H. Поле с цветочками
 * 
 * Черепаха Кондратина путешествует по клетчатому полю из n строк и m столбцов. В каждой клетке либо растёт цветочек, либо не растёт. Кондратине надо добраться из левого нижнего в правый верхний угол и собрать как можно больше цветочков.
 * Помогите ей с этой сложной задачей и определите, какое наибольшее число цветочков она сможет собрать при условии, что Кондратина умеет передвигаться только на одну клетку вверх или на одну клетку вправо за ход.
 */

/**
 * Функция для определения максимального количества собранных цветов Кондратиной
 * @param {number[]} field Массив вариантов количества цветов в каждой клетке
 * @returns {number} Максимальное количество собранных цветов
 */
function main(field) {
    const rows = field.length;
    const cols = field[0].length;
    let res = Array.from({ length: rows }, () => []);
  
    for (let x = 0; x < cols; x++) {
      for (let y = rows - 1; y >= 0; y--) {
        const left = x > 0 ? res[y][x - 1] : 0;
        const bottom = y < rows - 1 ? res[y + 1][x] : 0;
        res[y].push((bottom > left ? bottom : left) + field[y][x]);
      }
    }
  
    return `${res[0][cols - 1]}`;
  }
  
  // Блок ввода/вывода данных
  const readline = require('readline');
  const io_interface = readline.createInterface({ input: process.stdin });
  
  let lines = [];
  
  io_interface.on('line', function (line) {
    lines.push(line);
  });
  
  io_interface.on('close', function () {
    const [_, ...field] = lines;
    
    console.log(
        main(
            field.map(row => row.split('').map(Number))
        )
    );
  });
  
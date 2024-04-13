const rdln = require("readline");

/**
 * Интерфейс для чтения данных из стандартного ввода
 * @type {readline.Interface}
 */
const rdr = rdln.createInterface({
  input: process.stdin,
});

/**
 * Массив для хранения вводимых данных
 * @type {string[]}
 */
const inputs = [];
/**
 * Текущая обрабатываемая строка в массиве ввода
 * @type {number}
 */
let currentLine = 0;

// Слушатель события "line" для чтения данных из stdin
rdr.on("line", (line) => {
  inputs.push(line);
});

// Обработчик события "end" для вызова функции решения задачи
process.stdin.on("end", solution);

/**
 * Функция для определения минимального количества купюр, необходимых для выдачи сдачи
 * @param {number} totalCost Общая стоимость товара
 * @param {number[]} availableCash Доступные номиналы купюр
 * @returns {number} Минимальное количество купюр
 */
const withdrawMin = (totalCost, availableCash) => {
  /**
   * Массив для хранения количества купюр для каждой стоимости
   * @type {number[]}
   */
  const count = new Array(totalCost + 1).fill(-1);

  for (let i = 0; i < availableCash.length; i++) {
    for (let x = 0; x <= totalCost; x++) {
      const difference = x - availableCash[i];
      if (difference < 0 || (difference > 0 && count[difference] === -1)) continue;
      
      const current = difference > 0 ? 1 + count[difference] : 1;
      count[x] = count[x] === -1 ? current : Math.min(count[x], current);
    }
  }

  return count[count.length - 1];
};

/**
 * Функция для решения задачи и вывода результата
 */
function solution() {
  const totalCost = readInt();
  const _ = readInt();
  const availableCash = readIntLine();

  process.stdout.write(`${withdrawMin(totalCost, availableCash)}`);
}

/**
 * Функция для чтения одного целочисленного значения из ввода
 * @returns {number} Прочитанное целое число
 */
function readInt() {
  const n = Number(inputs[currentLine]);
  currentLine++;
  return n;
}

/**
 * Функция для чтения строки из ввода и преобразования ее в массив чисел
 * @returns {number[]} Массив чисел, полученный из строки ввода
 */
function readIntLine() {
  const line = inputs[currentLine];
  currentLine++;
  return line.split(" ").map(Number);
}

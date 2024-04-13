 //https://contest.yandex.ru/contest/26131/problems/D/

 /**
  * D. Общий префикс
  * 
  * Найдите наибольший по длине общий префикс нескольких строк.
  */

  /**
   * Определяет наибольший общий префикс для массива распакованных строк
   * @param {string[]} strings Массив строк для обработки
   * @returns {string} Наибольший общий префикс
   */
  function main(strings) {
    let prefix = strings[0];
  
    for (let i = 1; i < strings.length; i++) {
      // Распаковываем каждую строку и сравниваем ее с текущим префиксом
      const expanded = strings[i];
      let lastPrefixIndex = 0;
      for (let j = 0; j < prefix.length && j < expanded.length; j++) {
        if (expanded[j] !== prefix[j]) {
          // Обновляем префикс при первом несовпадении
          break;
        }
  
        lastPrefixIndex = j + 1;
      }
  
      prefix = prefix.substring(0, lastPrefixIndex);
  
      // Если префикс стал пустым, прерываем цикл
      if (prefix === "") break;
    }
  
    return prefix.length;
  }
  
  // Блок ввода/вывода данных
  const readline = require('readline');
  const io_interface = readline.createInterface({ input: process.stdin });
  
  let lines = [];
  
  io_interface.on('line', function (line) {
      lines.push(line);
  });
  
  io_interface.on('close', function () {
      const [_, ...strings]  = lines
  
      console.log(main(strings));
  });
  
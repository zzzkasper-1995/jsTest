// H. Большое число
// https://contest.yandex.ru/contest/23638/problems/H/

/**
 * 
 * @param {string} numLineStr 
 */
function main(numLineStr) {
    const numbers = numLineStr.split(' ').map(Number);

    const result = numbers.sort((a, b) => {
        const ab = '' + a + b;
        const ba = '' + b + a;

        return ba.localeCompare(ab);
    }).join('');

    console.log(result);
}

// console.log(res)

// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [str, numLineStr] = lines
    main(numLineStr)
});
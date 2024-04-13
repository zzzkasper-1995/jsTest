// https://contest.yandex.ru/contest/25596/problems/D/

/**
 * D. Числа Фибоначчи для взрослых
 * 
 * Гоша практикуется в динамическом программировании — он хочет быстро считать числа Фибоначчи. Напомним, что числа Фибоначчи определены как последовательность
 */

const del = (1000000000 + 7)

/**
 * 
 * @param {number} num
 */
function main(num) {
    let f1 = 1, f2 = 1

    let sum = 0
    if(num === 0 || num === 1) {
        return 1
    }

    let i = 2
    while(true) {
        sum = f1 + f2
        f1 = f2 % del
        f2 = sum % del

        if(i === num) {
            return sum % del
        }
        i += 1
    }
}


// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [num]  = lines

    console.log(main(Number(num)));
});
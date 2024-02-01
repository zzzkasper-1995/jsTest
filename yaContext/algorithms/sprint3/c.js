// C. Подпоследовательность
// https://contest.yandex.ru/contest/23638/problems/C/

/**
 * 
 * @param {string} subStr 
 * @param {string} str 
 */
function main(subStr, str) {
    let currentPoss = 0

    for(let i = 0; i < str.length; i++) { //&& currentPoss<subStr.length
        const s = str[i]
        if(s === subStr[currentPoss]) {
            currentPoss++
        }
    }


    return currentPoss===subStr.length ? 'True' : "False"
}

// const res = main('abcp', 'ahpc')
// console.log(res)

// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [subStr, str] = lines
    console.log(main(subStr, str))
});
// https://contest.yandex.ru/contest/23991/problems/A/?success=106562731#51450/2020_07_09/ggPyaEPG8k


/**
 * 
 * @param {number} a 
 * @param {number} m 
 * @param {string} str 
 */
function main(a, m, str) {
    let sum = Number(0) 
    for(let i = 0; i < str.length; i++) {
        const symbolCode = Number(str[i].charCodeAt(0));
        sum = (sum * a)%m + symbolCode%m
    }

    return Number(sum % m).toString()
}


// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [aStr, mStr, str]  = lines

    process.stdout.write(main(Number(aStr), Number(mStr), str));
});
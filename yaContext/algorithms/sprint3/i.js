// I. Любители конференций
// https://contest.yandex.ru/contest/23638/problems/I/

/**
 * 
 * @param {string} numLineStr 
 * @param {number} k 
 */
function main(numLineStr, k) {
    const numLine = numLineStr.split(' ').map(Number)
    const idMap = {

    }
    numLine.forEach(el => {
        if(!idMap[el]) {
            idMap[el] = 0
        }
        idMap[el]++
    })

    return Object.entries(idMap)
        .sort((a, b) => b[1] - a[1])
        .map(el => el[0])
        .slice(0, k)
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
    const [str, ids, k] = lines

    console.log(main(ids, Number(k)).join(' '))
});
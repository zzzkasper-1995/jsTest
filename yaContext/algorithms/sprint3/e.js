// E. Покупка домов
// https://contest.yandex.ru/contest/23638/problems/E/

/**
 * 
 * @param {string} maxSummStr 
 * @param {string} numLineStr 
 */
function main(maxSummStr, numLineStr) {
    let maxSumm = maxSummStr
    const numLine = numLineStr.split(' ')
        .map(Number)
        .sort((a, b) => {
            return a - b
        })

    console.log('numLine',maxSumm, numLine)
    for(let i = 0; i < numLine.length; i++) {
        maxSumm = maxSumm - numLine[i]
        if(maxSumm < 0) {
            return i   
        }
    }

    return numLine.length
}

// const res = main('300', '999 999 999')
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
    console.log(main(str.split(' ')[1], numLineStr))
});
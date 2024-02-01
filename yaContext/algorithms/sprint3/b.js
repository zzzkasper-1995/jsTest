// B. Комбинации

// https://contest.yandex.ru/contest/23638/problems/B/

const qwerty = {
    2:'abc',
    3:'def',
    4:'ghi',
    5:'jkl',
    6:'mno',
    7:'pqrs',
    8:'tuv',
    9:'wxyz'
}


const resBuff = []
// input 23
/**
 * 
 * @param {string} numLine 
 */
function main(numLine, currentInd, prevStr) {
    // console.log(numLine, currentInd, prevStr)
    if(currentInd>=numLine.length) {
        resBuff.push(prevStr)
        return
    }

    const qpair = qwerty[numLine[currentInd]]
    for(let i = 0; i < qpair.length; i++) {
        const qs = qpair[i]
        main(numLine, currentInd + 1, prevStr + qs)
    }
}

// main('92', 0, '')


// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [numLine] = lines
    main(numLine, 0, '')
    console.log(resBuff.join(' '))
});
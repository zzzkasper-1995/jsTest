// J. Пузырёк
// https://contest.yandex.ru/contest/23638/problems/J/

/**
 * 
 * @param {number[]} numLine
 */
function main(numLine) {
    let isGlobalChanged = false
    for(let i = 0; i < numLine.length; i++) {
        let isChanged = false
        for(let j = 0; j < numLine.length - i - 1; j++) {
            const a = numLine[j]
            const b = numLine[j + 1]

            if(a > b) {
                numLine[j] = b
                numLine[j + 1] = a
                isChanged = true
            }
        }
        if(isChanged) {
            console.log(numLine.join(' '))
            isGlobalChanged = true
        }
    }

    if(!isGlobalChanged) {
        console.log(numLine.join(' '))
    }
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
    const [count, numLineStr] = lines

    main(numLineStr.split(' ').map(Number))
});
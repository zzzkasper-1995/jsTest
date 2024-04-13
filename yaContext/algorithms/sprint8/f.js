// https://contest.yandex.ru/contest/26131/problems/F/

/** 
 * F. Частое слово
 * 
 * Дан набор слов, слова могут повторяться. Среди них надо найти самое частое слово. Если таких слов несколько, то выведите лексикографически наименьшее. */

/**
 * 
 * @param {string[]} words 
 */
function main(words) {
    const map = {}

    const sortWords = words.sort((a, b) => a.localeCompare(b))

    let maxWord = sortWords[0]
    let count = 1
    sortWords.forEach(word => {
        const wCount = map[word] || 0
        const wCurrCount = wCount + 1
        map[word] = wCurrCount
        if(wCurrCount > count) {
            count = wCurrCount
            maxWord = word
        }
    })

    return maxWord
}


// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [_, ...words]  = lines

    console.log(main(words));
});
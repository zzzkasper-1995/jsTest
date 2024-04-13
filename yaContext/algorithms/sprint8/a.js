// https://contest.yandex.ru/contest/26131/problems/A/

/**
 * A. Разворот строки
 * 
 * В некоторых языках предложения пишутся и читаются не слева направо, а справа налево.
 * Вам под руку попался странный текст –— в нём обычный (слева направо) порядок букв в словах.
 * А вот сами слова идут в противоположном направлении. 
 * Вам надо преобразовать текст так, чтобы слова в нём были написаны слева направо.
 */

/**
 * 
 * @param {string} str 
 */
function main(str) {
    const words = []

    let buff = ''
    function addWord() {
        if(buff) {
            words.unshift(buff)
        } 
        buff = ''
    }

    for(let i = 0; i < str.length; i++) {
        const symbol = str[i]
        if(symbol === ' ') {
            addWord()
        } else {
            buff += symbol
        }
    }
    addWord()

    return words.join(' ')
}


// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [str]  = lines

    console.log(main(str));
});
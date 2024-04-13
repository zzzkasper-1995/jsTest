// https://contest.yandex.ru/contest/26131/problems/K/?success=111985740#51450/2021_03_21/yqFARAEO3v

/**
 * K. Сравнить две строки
 * 
 * Алла придумала новый способ сравнивать две строки: чтобы сравнить строки a и b, в них надо оставить только те буквы, которые в английском алфавите стоят на четных позициях. Затем полученные строки сравниваются по обычным правилам. Помогите Алле реализовать новое сравнение строк.
 */
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

const ALPHABET_MAP = ALPHABET.split('').reduce((prev, curr, index) => ({...prev, [curr]: (index + 1) % 2 === 0}), {})

/**
 * 
 * @param {string} _str1 
 * @param {string} _str2 
 */
function main(str1, str2) {
    let comparedStr1 = str1.split('').reduce((prev, curr) => ALPHABET_MAP[curr] ? prev + curr : prev, '')
    let comparedStr2 = str2.split('').reduce((prev, curr) => ALPHABET_MAP[curr] ? prev + curr : prev, '')

    return comparedStr1===comparedStr2 ? 0 : comparedStr1 > comparedStr2 ? 1 : -1
}


// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [str1, str2]  = lines

    console.log(main(str1, str2));
});
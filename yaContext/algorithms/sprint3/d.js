// D. Печеньки
// https://contest.yandex.ru/contest/23638/problems/D/

/**
 * 
 * @param {string} childrenStr 
 * @param {string} cookiesStr 
 */
function main(childrens, cookieSizes) {
    let happyChildren = 0;
    let i = 0, j = 0;

    while (i < childrens.length && j < cookieSizes.length) {
        if (childrens[i] <= cookieSizes[j]) {
            happyChildren++;
            i++;
        }
        j++;
    }

    return happyChildren;
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
    const [count, childrensStr, countCookies, cookieSizesStr] = lines
    const childrens = childrensStr.split(' ').map(Number).sort((a, b) => a - b); 
    const cookieSizes = cookieSizesStr.split(' ').map(Number).sort((a, b) => a - b); 
    
    console.log(main(childrens, cookieSizes));
});
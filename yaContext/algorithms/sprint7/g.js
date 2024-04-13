// https://contest.yandex.ru/contest/25596/problems/G/

/**
 * G. Банкомат
 * 
 * Тимофей пошёл снять деньги в банкомат. Ему нужно m франков. В банкомате в бесконечном количестве имеются купюры различных достоинств. Всего различных достоинств n. Купюр каждого достоинства можно взять бесконечно много. Нужно определить число способов, которыми Тимофей сможет набрать нужную сумму.
 */

/**
 * 
 * @param {number} targetPoint
 * @param {number[]} variants
 */
function main(targetPoint, variants) {
    // console.log('main', targetPoint, variants)
    const matrix = Array(targetPoint + 1).fill(0)
    matrix[0] = 1

    for(let j = 0; j < variants.length; j++) {
        for(let i = 1; i <= targetPoint; i++) {
            const value = variants[j]
            if(i - value >= 0) {
                if(matrix[i - value] || i - value === 0) {
                    matrix[i] = matrix[i] + matrix[i - value]
                }
            }
        }
    }

    // console.log('matrix', matrix)
    return matrix[matrix.length - 1] 
}


// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [targetPointStr, _, variantsStr]  = lines
    const variants = variantsStr.split(' ').map(Number)
     
    console.log(main(Number(targetPointStr), variants));
});
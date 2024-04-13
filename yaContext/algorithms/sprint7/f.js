// https://contest.yandex.ru/contest/25596/problems/F/

/**
 * F. Прыжки по лестнице
 * 
 * Алла хочет доказать, что она умеет прыгать вверх по лестнице быстрее всех. На этот раз соревнования будут проходить на специальной прыгательной лестнице. С каждой её ступеньки можно прыгнуть вверх на любое расстояние от 1 до k. Число k придумывает Алла.
 * Гоша не хочет проиграть, поэтому просит вас посчитать количество способов допрыгать от первой ступеньки до n-й. Изначально все стоят на первой ступеньке.
 */

const del = (1000000000 + 7)

/**
 * 
 * @param {number} targetPoint
 * @param {number} maxStep
 */
function main(targetPoint, maxStep) {
    const matrix = Array(targetPoint + 1).fill(0)
    matrix[1] = 1

    for(let i = 1; i <= targetPoint; i++) {
        for(let j = 1; j <= maxStep; j++) {
            if(i - j >= 1) {
                if(matrix[i - j] || i - j === 1) {
                    matrix[i] = matrix[i] + matrix[i - j]
                }
            }
        }
        matrix[i] = matrix[i] % del
    }

    return matrix[matrix.length - 1] % del
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
    const [targetPoint, maxStep] = str.split(' ')
     
    console.log(main( Number(targetPoint), Number(maxStep)));
});
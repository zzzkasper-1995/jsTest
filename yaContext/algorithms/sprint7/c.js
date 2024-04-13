// Задание: https://contest.yandex.ru/contest/25596/problems/C/

/**
 * C. Золотая лихорадка
 * 
 * Гуляя по одному из островов Алгосского архипелага, Гоша набрёл на пещеру, в которой лежат кучи золотого песка. К счастью, у Гоши есть с собой рюкзак грузоподъёмностью до M килограмм, поэтому он может унести с собой какое-то ограниченное количество золота.
 * Всего золотых куч n штук, и все они разные. В куче под номером i содержится mi килограммов золотого песка, а стоимость одного килограмма — ci алгосских франков.
 * Помогите Гоше наполнить рюкзак так, чтобы общая стоимость золотого песка в пересчёте на алгосские франки была максимальной.
 * */

/**
 * 
 * @param {number} maxWeight
 * @param {[number, number][]} golds - массив содержит цены за кг, и вес куч золота
 */
function main(maxWeight, golds) {
    let summMoney = 0
    let summWeight = 0

    const sGolds = golds.sort((a, b) => b[0] - a[0])

    let i = 0
    while(sGolds[i]) {
        const gold = sGolds[i]

        const weight = Math.min(gold[1], maxWeight - summWeight)
        summMoney += weight * gold[0]
        summWeight += weight
        i += 1

        if(summWeight === maxWeight) {
            break
        }
    }

    return `${summMoney}`
}


// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [maxWeight, _, ...golds]  = lines

    process.stdout.write(
        main(Number(maxWeight), golds.map(el => el.split(' ').map(Number)))
    );
});
// Задание: https://contest.yandex.ru/contest/25596/problems/B/

/**
 * B. Расписание
 * 
 * Дано количество учебных занятий, проходящих в одной аудитории. Для каждого из них указано время начала и конца. Нужно составить расписание, в соответствии с которым в классе можно будет провести как можно больше занятий.
 * Если возможно несколько оптимальных вариантов, то выведите любой. Возможно одновременное проведение более чем одного занятия нулевой длительности.
 */

/**
 * 
 * @param {[number, number][]} periods
 */
function main(periods) {
    const sPeriods = periods.sort((a, b) =>  (b[0] - a[0]) !== 0 ? b[0] - a[0] : b[1] - a[1])

    // console.log('sPeriods', sPeriods)
    const res = [sPeriods[0]]
    let i = 1
    while(i < sPeriods.length) {
        // console.log('COMP', sPeriods[i], res[res.length - 1], sPeriods[i][1] <= res[res.length - 1][0])
        if(sPeriods[i][1] <= res[res.length - 1][0]) {
            res.push(sPeriods[i]) 
        }

        i += 1
    }

    return res.sort((a, b) =>  a[0] - b[0] !== 0 ? a[0] - b[0] : a[1] - b[1])
}


// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [_, ...periods]  = lines

    const res = main(
        periods.map(el => el.split(' ').map(n => parseFloat(n)))
    )
    console.log(res.length);
    res.forEach(el => console.log(el[0], el[1]))
});
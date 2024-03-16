// https://contest.yandex.ru/contest/23991/problems/F/


/**
 * 
 * @param {string[]} str 
 */
function main(strArr) {
    const map = {}
    strArr.forEach((str, index) => {
        // console.log('str.split()', str.split(''))
        const sortStr = str.split('').sort().join()
        if(!map[sortStr]) {
            map[sortStr] = []
        }
        map[sortStr].push(index)
    })
    // console.log('map', map)

    const res = Object.keys(map)
        .map(key => map[key])
        .sort((a, b) => a[0] - b[0])
        .forEach(strArr => console.log(strArr.join(' ')))
}
 

// const res = main(Number(1000), Number(1000009), 'abcdefgh', Number(5) - 1, Number(8))
// console.log('res', res)

// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [count, strs]  = lines

    main(strs.split(' '))
});
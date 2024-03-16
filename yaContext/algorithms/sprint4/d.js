


function main(str) {
    const set = new Set(str)

    return set.forEach(el=>console.log(String(el)))
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
    const [count, ...strs]  = lines

    main(strs)
    // console.log('main', main(strs))
});
// Ближайший ноль

// Отчет: https://contest.yandex.ru/contest/22450/run-report/105822029/

/** Подготавливаем входные данные */
function formatInput(length, map) {
    let sequenceLength = +length;
    let sequence = map.split(' ').map(Number);

    return { sequenceLength, sequence };
};

/** Вычисления ближайшего пустого участка */
function findClosestZero(sequenceLength, sequence) {
    let result = [];
    let lastZeroIndex = sequence[0] === 0 ? 0 : sequenceLength + 1;
    let distance = 0;

    for (let i = 0; i < sequenceLength; i++) {
        if (sequence[i] === 0) {
            result[i] = distance;

            let distanceToCover;
            if (lastZeroIndex === sequenceLength + 1) {
                distanceToCover = i;
            } else {
                distanceToCover = (i - lastZeroIndex) / 2;
            }

            for (let k = 0; k <= distanceToCover; k++) {
                result[i - k] = k;
            }

            lastZeroIndex = i;
            distance = 0;
        } else {
            distance += 1;
            result[i] = distance;
        }
    }

    return result;
};

/** Форматирование результата в формат вывода */
function formatResult(result) {
    return result.join(' ');
};

function calculateDistances(length, map) {
    const { sequenceLength, sequence } = formatInput(length, map);

    const result = findClosestZero(sequenceLength, sequence);

    return formatResult(result);
};


const readline = require('readline');
const ioInterface = readline.createInterface({ input: process.stdin });

let lines = [];

ioInterface.on('line', function (line) {
    lines.push(line);
});

ioInterface.on('close', function () {
    const [length, map] = lines

    console.log(calculateDistances(length, map));
});

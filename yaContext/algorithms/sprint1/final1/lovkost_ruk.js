// Ловкость рук

// Отчет: https://contest.yandex.ru/contest/22450/run-report/105824105/

/** Подготавливаем входные данные */
function formatInput(fingerCountStr, matrixStr) {
    const fingerCount = Number(fingerCountStr);
    const matrix = matrixStr.map(el => el.split('').map(Number));

    return { fingerCount, matrix };
};

/** Подсчет победных очков */
function calculateWinPoints(fingerCount, matrix) {
    // Количество игроков
    const playersCount = 2

    // Максимальное число в игре
    const maxNum = 9

    const defaultNumCount = 0
    /**Cколько раз цифра встречается в матрице.
     * 
     * Информация о количестве повторений цифры хранится в i-1 позиции массива,
     * где i - это число от 1 до maxNum
     */
    const matrixMeta = Array(maxNum).fill(defaultNumCount);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const el = matrix[i][j];
            if (!isNaN(el)) {
                matrixMeta[el - 1] += 1;
            }
        }
    }

    const winPoints = matrixMeta.reduce((prev, curr) => {
        if (curr !== 0 && curr <= fingerCount * playersCount) {
            prev += 1;
        }

        return prev;
    }, 0);

    return winPoints;
};

/** Форматирование результата в формат вывода */
function formatResult(result) {
    return `${result}`;
};

const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [fingerCountStr, ...matrixStr] = lines;
    const { fingerCount, matrix } = formatInput(fingerCountStr, matrixStr);

    const result = calculateWinPoints(fingerCount, matrix);

    console.log(formatResult(result));
});

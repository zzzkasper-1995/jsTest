/**
 * Алла получила задание, связанное с мониторингом работы различных серверов. Требуется понять, сколько времени обрабатываются определённые запросы на конкретных серверах. Эту информацию нужно хранить в матрице, где номер столбца соответствуют идентификатору запроса, а номер строки — идентификатору сервера. Алла перепутала строки и столбцы местами. С каждым бывает. Помогите ей исправить баг.

Есть матрица размера m × n. Нужно написать функцию, которая её транспонирует.
 */

/** Подготавливаем входные данные */
function formatInput(rowCountStr, columnCountStr, matrixStr) {
    const rowCount = Number(rowCountStr) 
    const columnCount = Number(columnCountStr)
    const matrix = matrixStr.map(line => line.split(' ').map(Number))

    return { rowCount, columnCount, matrix };
};

/** Транспонированние матрицы */
function reversMatrix(rowCount, columnCount, matrix) {
    const defaultValue = 0
    const rvMatrix = Array(columnCount).fill(0)
        .map(() => Array(rowCount).fill(defaultValue));

    for(let i = 0; i < rowCount; i++) {
        for(let j = 0; j < columnCount; j++) {
            rvMatrix[j][i] = matrix[i][j]
        }
    }

    return rvMatrix
};

/** Форматирование результата в формат вывода */
function formatResult(result) {
    return result.map(line=>line.join(' ')).join('\n');
};

const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [rowCountStr, columnCountStr, ...matrixStr] = lines;
    const  {rowCount, columnCount, matrix} = formatInput(rowCountStr, columnCountStr, matrixStr)
    
    const res = reversMatrix(rowCount, columnCount, matrix)

    console.log(formatResult(res))
});

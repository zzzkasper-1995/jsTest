// Отчет: https://contest.yandex.ru/contest/23815/run-report/106063717/

// Описание задачи: https://contest.yandex.ru/contest/23815/problems/B/

/**
-- ПРИНЦИП РАБОТЫ --
Быстрая сортировка, реализованная здесь, использует подход in-place, что означает сортировку массива без выделения дополнительной памяти,
т.к. элементы меняются местами сразу в исходном массиве
Алгоритм выбирает 'опорный' элемент и затем использует два указателя, которые перемещаются от начала и конца массива соответственно
Эти указатели используются для размещения всех элементов меньше опорного слева от него и всех элементов больше - справа
Таким образом, массив делится на две части: одна с элементами меньше опорного и другая с элементами больше опорного
Далее алгоритм рекурсивно применяется к каждой из этих частей

В качестве опорного элемента берем, тот что по середине

Для того что бы сделать функцию сортировки более универсальной к формату входных данных, был добавлен доп параметр compareFunction, 
в котором можно указать правило сортировки для массивов с разными типами данных :)

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Работа алгоритма основана на принципах разделяй и властвуй и in-place сортировке. После размещения опорного элемента на его правильную позицию,
все элементы меньше него гарантированно находятся слева, а больше - справа. Это обеспечивает корректное разделение массива
Последовательное применение этого процесса к подмассивам обеспечивает полную сортировку

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Средняя временная сложность алгоритма быстрой сортировки составляет O(n log n)
В худшем случае, когда опорный элемент выбран неудачно,
временная сложность может достигать O(n^2)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
in-place характер алгоритма, определяет пространственную сложность как O(log n), что соответствует глубине стека вызовов при рекурсии
*/

/**
 * @typedef {Object} Player
 * @property {string} login - Логин участника
 * @property {number} solvedTasks - Количество решенных задач участником
 * @property {number} penalty - Штрафные баллы участника
 */

/**
 * Функция сравнения для сортировки участников
 * @param {Player} a - Первый участник
 * @param {Player} b - Второй участник
 * @returns {number} Результат сравнения
 */
function compareParticipants(a, b) {
    if (a.solvedTasks > b.solvedTasks) return -1;
    if (a.solvedTasks < b.solvedTasks) return 1;

    if (a.penalty < b.penalty) return -1;
    if (a.penalty > b.penalty) return 1;

    return a.login.localeCompare(b.login);
}

/**
 * Быстрая сортировка с пользовательской функцией сравнения.
 * @param {object[]} arr - Входной массив для сортировки.
 * @param {function(object, object): number} compareFunction - Функция для сравнения двух элементов массива. Должна возвращать отрицательное значение, если первый элемент меньше второго, положительное значение, если первый элемент больше второго, и ноль, если они равны.
 * @param {number} [startLeftInd=0] - Начальный индекс левой границы подмассива для сортировки. Опциональный.
 * @param {number} [startRightInd=arr.length - 1] - Начальный индекс правой границы подмассива для сортировки. Опциональный.
 */
function quickSort(arr, compareFunction, startLeftInd = 0, startRightInd = arr.length - 1) {
    if (startLeftInd >= startRightInd) {
        return;
    }

    let leftInd = startLeftInd;
    let rightInd = startRightInd;
    let pivotValue = arr[Math.floor((leftInd + rightInd) / 2)];

    while (true) {
        // Ищем первый элемент с лева, который больше Опорного
        while (compareFunction(arr[leftInd], pivotValue) < 0) {
            leftInd++;
        }
        // Ищем первый элемент с права, который меньше Опорного
        while (compareFunction(arr[rightInd], pivotValue) > 0) {
            rightInd--;
        }

        // Если при поиске левый и правый указатель встретились, значит уже элемент находится в нужном месте
        if (leftInd >= rightInd) {
            break;
        }

        // меняем элементы местами
        const temp = arr[leftInd]
        arr[leftInd] = arr[rightInd]
        arr[rightInd] = temp
    }

    const pivotIndex = rightInd;

    quickSort(arr, compareFunction, startLeftInd, pivotIndex);
    quickSort(arr, compareFunction, pivotIndex + 1, startRightInd);
}


/** Главный метод 
 * @param {string[]} players список участников, формат данных: [логин] [баллы] [штрафы]
*/
function main(players) {
    const participants = players.map(line => {
        const [login, solvedTasks, penalty] = line.split(' ');

        return {
            login,
            solvedTasks: parseInt(solvedTasks),
            penalty: parseInt(penalty)
        };
    });

    quickSort(participants, compareParticipants);

    participants.forEach(participant => process.stdout.write(participant.login+'\n'));
}


// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [count, ...players] = lines

    main(players)
});


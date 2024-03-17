// Отчет: https://contest.yandex.ru/contest/24810/run-report/109902148/

// Описание задачи: https://contest.yandex.ru/contest/24810/problems/?nc=RRPGN2Ig&success=109902148#51450/2021_02_04/LGaJZ4au9k

/**
-- ПРИНЦИП РАБОТЫ --
Пирамидальная сортировка работает следующим образом: исходный массив преобразуется в максимальную кучу,
где максимальный элемент находится на первой позиции (корень кучи)
Это достигается за счет процедуры "просеивания" элементов, которая гарантирует,
что каждый родительский узел больше своих дочерних узлов


Затем для того чтобы определить первый элемент итогового массива,
мы вытаскиваем из кучи корень (максимальный элемент) и помещаем его на первую позицию итогового массива,
а саму кучу нормализуем используя "просеивание" в то состояние,
при котором максимальный элемент будет вновь находится в корне.

Повторяем это для 2ого, 3его ... n-ого элемента,
каждый раз уменьшая непосредственную часть кучи на один элемент за раз, до тех пор, пока вся куча не будет преобразована в отсортированный массив

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Пирамидальная сортировка гарантирует корректность результата,
поскольку строит исходный массив в максимальную кучу,
где свойство кучи (родитель больше своих детей) обеспечивает, что наибольший элемент всегда находится в корне.
При удалении корня и его замене последним элементом кучи,
последующее "просеивание" вниз восстанавливает свойство кучи.
Поскольку каждый раз наибольший элемент кучи перемещается в конечный массив,
а размер кучи уменьшается, процесс продолжается до тех пор, пока не будут перебраны все элементы.

Таким образом, алгоритм обеспечивает упорядоченность массива по убыванию.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Формирование максимальной кучи на основе исходного массива происходит за n*log(n) операций

Извлечение максимального элемента и восстановление свойства кучи после каждого извлечения происходит за O(log n) операций, которые нужно выполнить n раз.


Итоговая сложность O(2n*log(n)) или O(n*log(n))

Сложность выделения памяти на формирование массивов длинной N можно опустить потому что N < n*log(n)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Алгоритм требует дополнительного пространства для формирования кучи, что в данной реализации соответствует дополнительному массиву размером n, и для итогового отсортированного массива, также размером n.
Итого, пространственная сложность составляет O(n)
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
 * Пирамидальная сортировка с пользовательской функцией сравнения
 * @param {object[]} arr - Входной массив для сортировки.
 * @param {function(object, object): number} compareFunction - Функция для сравнения двух элементов массива. Должна возвращать отрицательное значение, если первый элемент меньше второго, положительное значение, если первый элемент больше второго, и ноль, если они равны.
 * @param {number} [startLeftInd=0] - Начальный индекс левой границы подмассива для сортировки. Опциональный.
 * @param {number} [startRightInd=arr.length - 1] - Начальный индекс правой границы подмассива для сортировки. Опциональный.
 */
function heapSort(arr, compareFunction) {
    const maxHeap = new Array(arr.length)

    /** Формируем максимальную кучу */
    arr.forEach((el, index) => {
        maxHeap[index] = el

        let currentIndex = index;
        while(currentIndex !== 0) {
            const rootIndex = Math.floor((currentIndex - 1) / 2)
            const c = compareParticipants(maxHeap[rootIndex], maxHeap[currentIndex])
            if(c < 0) {
                break
            }

            [maxHeap[rootIndex], maxHeap[currentIndex]] = [maxHeap[currentIndex], maxHeap[rootIndex]]
            currentIndex = rootIndex
        }
    })


    /** Результирующий массив */
    const res = new Array(arr.length)


    /** Пошагово вытаскиваем из кучи максимальный элемент  */
    for(let index = 0; index < maxHeap.length; index++) {
        res[index] = maxHeap[0]

        maxHeap[0] = maxHeap[maxHeap.length - index - 1]
        maxHeap[maxHeap.length - index - 1] = null

        let currentIndex = 0
        while(currentIndex < maxHeap.length - index - 1) {
            const leftIndex = currentIndex * 2 + 1
            const rightIndex = currentIndex * 2 + 2

            if(leftIndex >= maxHeap.length - index - 1 && 
                rightIndex >= maxHeap.length - index - 1) {
                break
            }

            let maxIndex
            if(maxHeap[rightIndex] && maxHeap[leftIndex]) {
                maxIndex = compareParticipants(maxHeap[leftIndex], maxHeap[rightIndex]) > 0 ? rightIndex : leftIndex
                maxIndex = compareParticipants(maxHeap[maxIndex], maxHeap[currentIndex]) > 0 ? currentIndex : maxIndex
            } else {
                const comIndex = maxHeap[rightIndex] ? rightIndex : leftIndex
                maxIndex = compareParticipants(maxHeap[comIndex], maxHeap[currentIndex]) > 0 ? currentIndex : comIndex
            }

            if(maxIndex === currentIndex) {
                break
            }

            [maxHeap[maxIndex], maxHeap[currentIndex]] = [maxHeap[currentIndex], maxHeap[maxIndex]]
            currentIndex = maxIndex
        }
    }

    return res
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

    const res = heapSort(participants, compareParticipants);
    res.forEach(participant => process.stdout.write(participant.login+'\n'));
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


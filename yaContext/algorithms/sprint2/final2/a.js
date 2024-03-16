// ОТЧЕТ: https://contest.yandex.ru/contest/22781/run-report/105937216/

// Описание задания https://contest.yandex.ru/contest/22781/problems/A/

/**
-- ПРИНЦИП РАБОТЫ --
Реализация дека основана на использовании массива фиксированного размера в качестве кольцевого буфера
Это позволяет эффективно использовать память и обеспечивает быстрый доступ к элементам с обоих концов структуры

Операции pushBack и pushFront добавляют элементы соответственно в конец или начало дека, в то время как popBack и popFront удаляют элементы с конца или начала

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Использование кольцевого буфера гарантирует, что каждый элемент будет обработан корректно
в соответствии с порядком FIFO (первым пришёл — первым ушёл) или LIFO (последним пришёл — первым ушёл),
в зависимости от направления добавления и удаления элементов. Это обеспечивает корректную реализацию двусторонней очереди

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Каждая операция (pushBack, pushFront, popBack, popFront) в среднем имеет амортизированную временную сложность O(1),
так как добавление и удаление элементов происходит за константное время без необходимости перемещения остальных элементов дека

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Пространственная сложность данной реализации составляет O(n), где n - максимальный размер дека.
Это объясняется тем, что используется массив фиксированного размера, который занимает столькоже места, сколько элементов он может вместить
*/

const ERRORS =  {
   DEQUE_IS_EMPTY: 'error',
   DEQUE_IS_FULL: 'error' 
}

/** Структура Дек */
class Deque {
    constructor(maxSize) {
        this.buffer = new Array(maxSize);
        this.maxSize = maxSize;
        this.size = 0;
        this.head = 0;
        this.tail = 0;
    }

    /** Заполнен ли Deque до конца? Вернет true если больше нет свободных лотов для добавления элементов */
    isFull() {
        return this.size === this.maxSize;
    }

    /** Пуст ли Deque? Вернет true если в структуре нет ниодного добавленного элемента */
    isEmpty() {
        return this.size === 0;
    }

    /** Добавить элемент в конец 
     * @param {number} value значение элемента, который будет добавлен
     */
    pushBack(value) {
        if (this.isFull()) {
            throw new Error(ERRORS.DEQUE_IS_FULL);
        }

        this.buffer[this.tail] = value;
        this.tail = (this.tail + 1) % this.maxSize;
        this.size += 1;
    }

    /** Добавить элемент в начало 
     * @param {number} value значение элемента, который будет добавлен
    */
    pushFront(value) {
        if (this.isFull()) {
            throw new Error(ERRORS.DEQUE_IS_FULL);
        }

        this.head = (this.head - 1 + this.maxSize) % this.maxSize;
        this.buffer[this.head] = value;
        this.size += 1;
    }

    /** Вытащить элемент из начала */
    popFront() {
        if (this.isEmpty()) {
            throw new Error(ERRORS.DEQUE_IS_EMPTY);
        }

        const value = this.buffer[this.head];
        this.head = (this.head + 1) % this.maxSize;
        this.size -= 1;

        return value;
    }

    /** Вытащить элемент из конца */
    popBack() {
        if (this.isEmpty()) {
            throw new Error(ERRORS.DEQUE_IS_EMPTY);
        }

        this.tail = (this.tail - 1 + this.maxSize) % this.maxSize;
        const value = this.buffer[this.tail];
        this.size -= 1;

        return value;
    }
}

/** Главный метод 
 * @param {string} commands команда для deque, формат команды [название метода] [параметр]
 * @param {Deque} deque экземпляр структуры Deque
*/
const main = (commands, deque) => {
    for (let command of commands) {
        const [cmd, value] = command.split(' ');

        switch (cmd) {
            case 'push_back':
                try {
                    deque.pushBack(Number(value))
                } catch(error) {
                    process.stdout.write(error.message + '\n');
                }

                break;
            case 'push_front':
                try {
                    deque.pushFront(Number(value))
                } catch(error) {
                    process.stdout.write(error.message + '\n');
                }

                break;
            case 'pop_back':
                try {
                    const popBackResult = deque.popBack();
                    process.stdout.write(popBackResult + '\n');
                } catch(error) {
                    process.stdout.write(error.message + '\n');
                }

                break;
            case 'pop_front':
                try {
                    const popFrontResult = deque.popFront();
                    process.stdout.write(popFrontResult+'\n');
                } catch(error) {
                    process.stdout.write(error.message + '\n');
                }

                break;
        }
    }
};


// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [countStr, maxSizeStr, ...commands] = lines
    const maxSize = parseInt(maxSizeStr);
    
    const deque = new Deque(maxSize);
    main(commands, deque);
});

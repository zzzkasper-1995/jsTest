// ОТЧЕТ https://contest.yandex.ru/contest/22781/run-report/105880573/

// Описание задания https://contest.yandex.ru/contest/22781/problems/B/

/*
-- ПРИНЦИП РАБОТЫ --
Я реализовал стек на подобии односвязного списка,
в которой каждый следующий элемент имеет указатель на предыдущий

При добавлении в стек, мы создаем новый узел и задаем в нем 2 параметра: 
указатель на предыдущий элемент и значение

Основной алгоритм анализирует входную строку с лева на право
Если встречается число, то добавляем его в стек,
иначе пытаемся найти соответствующую команду, получаем два последних элемента стека и затем добавляем результат операции обратно в стек


-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Добавление/Извлечение в стек стоит O(1) потому что нам не нужно итерировать весь стек, т.к мы всегда за 1 операцию можем достать последний элемент

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Стек состоит из узлов которым для хранения каждого значения нужно 2 единицы памяти: выделяется память на запись значения и ссылки на предыдущий элемент
Следовательно для работы с n элементами потребуется 2n памяти что соответствует O(n) памяти. 
Дополнительная память нужна только для хранения входных данных

Если строка ввода будет валидна и данные всегда будут в польской натации, то в стеке в любой момент времени будет находится не больше 2ух элементов
*/

class Node {
    constructor(value = null, prev = null) {
        this.value = value;
        this.prev = prev;
    }
}

class Stack {
    constructor() {
        this.lastNode = null;
    }

    push(value) {
        this.lastNode = new Node(value, this.lastNode);
    }

    pop() {
        if (!this.lastNode) {
            throw new Error('error');
        }

        const value = this.lastNode.value;
        this.lastNode = this.lastNode.prev;

        return value;
    }

    top() {
        if (!this.lastNode) {
            throw new Error('error');
        }

        return this.lastNode.value;
    }
}

/** Выполняем арифметические операции */
function calculate(a, b, operation) {
    switch (operation) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) throw new Error('Division by zero');

            return Math.floor(a / b);
        default:
            throw new Error('Invalid operation');
    }
}

/** Главный метод */
function main() {
    const [operationsStr] = lines;
    const operations = operationsStr.split(' ');

    const stack = new Stack();

    operations.forEach(operation => {
        try {
            if (!isNaN(operation)) {
                stack.push(Number(operation));
            } else {
                const b = stack.pop();
                const a = stack.pop();

                stack.push(calculate(a, b, operation));
            }
        } catch (error) {
            console.error(error.message);

            throw new Error(error);
        }
    });

    console.log(stack.top());
}


// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    main();
});

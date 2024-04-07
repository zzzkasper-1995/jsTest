// ОТЧЕТ: https://contest.yandex.ru/contest/25070/run-report/111227669/

// Описание задания: https://contest.yandex.ru/contest/25070/problems/?success=111227133#51450/2020_08_27/M6r8NNr0fY

/**
 * -- ПРИНЦИП РАБОТЫ --
 * Алгоритм построения максимального остовного дерева (MST) основан на жадном методе.
 * Он начинает с пустого дерева и постепенно добавляет к нему рёбра с наибольшим весом,
 * гарантируя при этом отсутствие циклов. Для эффективного поиска максимальных рёбер используется приоритетная очередь.
 * 1. Инициализация: создается приоритетная очередь для рёбер по их весу и все вершины считаются непосещенными.
 * 2. Обработка вершин: для выбранной вершины в очередь добавляются все исходящие из неё рёбра, ведущие к непосещенным вершинам.
 * 3. Построение MST: из очереди извлекается ребро с максимальным весом, которое не формирует циклы, и добавляется в MST.
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * Жадный выбор на каждом шаге гарантирует, что добавляемое ребро имеет максимальный вес среди всех возможных,
 * не ведущих к образованию цикла в дереве. Это обеспечивает нахождение MST с максимальным весом.
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * Инициализация очереди происходит за O(m), где m - количество рёбер. Для каждого ребра выполнение операций добавления
 * и извлечения из приоритетной очереди требует O(log m) времени. Следовательно, общая временная сложность алгоритма составит O(m log m).
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * Для хранения графа требуется O(m) памяти. Дополнительно, приоритетная очередь также потребует O(m) памяти для хранения рёбер,
 * а для хранения информации о посещенности вершин потребуется O(n), где n - количество вершин. Итого, пространственная сложность O(m + n).
 */


/**
 * Приоритетная очередь с использованием структуры данных "куча"
 * @class
 */
class PriorityQueue {
    constructor() {
        /** @property {Array} data - Массив, представляющий кучу */
        this.data = [-1];
        /** @property {number} length - Количество элементов в куче */
        this.length = 0;
        /** @property {function} compareFunction - Функция сравнения элементов */
        this.compareFunction = (a, b) => a.weight > b.weight;
    }

    /**
     * Добавляет элемент в приоритетную очередь
     * @param {*} element - Элемент для добавления
     */
    push(element) {
        this.data.push(element);
        this.length++;
        this.siftUp(this.length);
    }

    /**
     * Извлекает и удаляет элемент с наивысшим приоритетом из очереди
     * @returns {*} Элемент с наивысшим приоритетом
     */
    popMax() {
        if (this.length === 0) throw new Error("Queue is empty");
        this.swap(1, this.length);
        const max = this.data.pop();
        this.length--;
        this.siftDown(1);

        return max;
    }

    /**
     * Обмен местами двух элементов в куче
     * @param {number} i - Индекс первого элемента
     * @param {number} j - Индекс второго элемента
     */
    swap(i, j) {
        [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
    }

    /**
     * Всплытие элемента в куче для восстановления свойства кучи
     * @param {number} idx - Индекс элемента для всплытия
     */
    siftUp(idx) {
        if (idx === 1) return;
        
        let parentIndex = Math.floor(idx / 2);
        if (this.compareFunction(this.data[idx], this.data[parentIndex])) {
            this.swap(idx, parentIndex);
            this.siftUp(parentIndex);
        }
    }

    /**
     * Опускание элемента в куче для восстановления свойства кучи
     * @param {number} idx - Индекс элемента для опускания
     */
    siftDown(idx) {
        let highest = idx;
        const leftChildIndex = 2 * idx;
        const rightChildIndex = 2 * idx + 1;

        if (leftChildIndex <= this.length && this.compareFunction(this.data[leftChildIndex], this.data[highest])) {
            highest = leftChildIndex;
        }

        if (rightChildIndex <= this.length && this.compareFunction(this.data[rightChildIndex], this.data[highest])) {
            highest = rightChildIndex;
        }

        if (highest !== idx) {
            this.swap(idx, highest);
            this.siftDown(highest);
        }
    }
}

/**
 * Класс для построения максимального остовного дерева графа
 * @class
 */
class MaxSpanningTreeBuilder {
    /**
     * Инициализирует экземпляр для построения максимального остовного дерева
     * @param {number} vertexes - Количество вершин
     * @param {Array<Array<number>>} edgeList - Список рёбер
     */
    constructor(vertexes, edgeList) {
        /** @property {PriorityQueue} edges - Очередь рёбер с приоритетом по весу */
        this.edges = new PriorityQueue();
        /** @property {Set<number>} notAdded - Набор непосещённых вершин */
        this.notAdded = new Set(Array.from({ length: vertexes }, (_, i) => i + 1));

        /** @property {Array<Array<Object>>} adjacency - Список смежности */
        this.adjacency = Array.from({ length: vertexes + 1 }, () => []);
        this.constructAdjacencyList(edgeList);
    }

    /**
     * Заполняет список смежности на основе списка рёбер
     * @param {Array<Array<number>>} edgeList - Список рёбер
     */
    constructAdjacencyList(edgeList) {
        edgeList.forEach(([src, dest, weight]) => {
            this.adjacency[src].push({ to: dest, weight });
            this.adjacency[dest].push({ to: src, weight });
        });
    }

    /**
     * Обрабатывает вершину, добавляя исходящие из неё рёбра в очередь с приоритетом
     * @param {number} vertex - Обрабатываемая вершина
     */
    addVertex(vertex) {
        this.notAdded.delete(vertex);
        this.adjacency[vertex].forEach(edge => {
            if (this.notAdded.has(edge.to)) this.edges.push(edge);
        });
    }

    /**
     * Вычисляет общий вес максимального остовного дерева
     * @returns {number} Общий вес дерева
     */
    calculateTotalWeight() {
        let totalWeight = 0;
        this.addVertex(1); // Начинаем с вершины 1

        while (this.notAdded.size > 0 && this.edges.length > 0) {
            const { to, weight } = this.edges.popMax();
            if (this.notAdded.has(to)) {
                totalWeight += weight;
                this.addVertex(to);
            }
        }

        if (this.notAdded.size) throw new Error("Oops! I did it again");

        return totalWeight;
    }
}

/**
 * Функция решения задачи
 */
function main() {
    const [vertexes, numEdges] = readIntegers();
    const edges = readEdgesList(numEdges);

    const treeBuilder = new MaxSpanningTreeBuilder(vertexes, edges);

    try {
        const totalWeight = treeBuilder.calculateTotalWeight();
        process.stdout.write(`${totalWeight}`);
    } catch (error) {
        process.stdout.write(error.message);
    }
}

/**
 * Читает строку и преобразует её в массив чисел
 * @returns {Array<number>} Массив чисел
 */
function readIntegers() {
    const line = inputLines[_curLine++];

    return line.split(' ').map(Number);
}

/**
 * Читает список рёбер из входных данных
 * @param {number} count - Количество рёбер
 * @returns {Array<Array<number>>} Список рёбер
 */
function readEdgesList(count) {
    let list = [];
    for (let i = 0; i < count; i++) {
        list.push(readIntegers());
    }

    return list;
}


// Блок ввода/вывода данных
const readline = require("readline");

const ioInterface = readline.createInterface({
  input: process.stdin,
});

const inputLines = [];
let _curLine = 0;

ioInterface.on("line", (line) => {
  inputLines.push(line);
});

process.stdin.on("end", main);
// Отчет: https://contest.yandex.ru/contest/24414/run-report/106259858/

// Описание задачи: https://contest.yandex.ru/contest/24414/problems/B/

/**
 * -- ПРИНЦИП РАБОТЫ --
 * Реализованная структура данных HashMap основана на концепции хэш-таблицы с использованием метода цепочек для разрешения коллизий.
 * Каждая запись в HashMap состоит из пары ключ-значение, где ключи уникальны.
 * 
 * В качестве набора "корзин" выступает массив, потому что массивы позволяют получать значение элемента по ключу (индексу) за O(1)
 * При вставке нового элемента сначала вычисляется хэш ключа, который определяет индекс "корзины", затем если корзина пустая,
 * то ключ/значение записываются в Ноду, которая помещается в ячейку. Эта нода становится головой связанного списка.
 * Если в корзине уже есть элементы, новый элемент добавляется в конец связного списка.
 * 
 * При поиске элемента сначала вычисляется хэш ключа для определения корзины,
 * а затем происходит итерация по связному списку внутри этой корзины до нахождения нужного элемента
 * 
 * Удаление элемента также начинается с определения корзины по хэшу ключа,
 * затем элемент удаляется из связного списка в этой корзине, если он там присутствует
 * 
 * Стоит отметить:
 * Хэш-функция: в данной реализации для числовых ключей хэш-функция просто возвращает сам ключ. Для других типов данных можно добавить соответствующие хэш-функции.
 * Размерность хэш-таблицы: количество корзин - это простое число, которое определяется исходя из потенциального количества ключей
 * 
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * Каждый ключ преобразуется в хэш с помощью хэш-функции.
 * В данной реализации для числовых ключей хэш совпадает с самим ключом, что упрощает процес и гарантирует детерминированость
 * 
 * Следовательно, мы всегда будем находить одну и ту же таблицу после расчета хэша.
 * 
 * После нахождения нужной корзины, поиска элемента осуществляется по цепочке с использованием указателя next
 * Найдя ноду с нужным элементом мы можем сделать с ним любую требуемую операцию
 * 
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * В идеальном случае, когда коллизии отсутствуют, основные операции (вставка, поиск, удаление) выполняются за O(1).
 * Однако в худшем случае, при наличии коллизий и неравномерном распределении элементов по корзинам может достигать 0(n),
 * но при текущих условиях это возможно только в том случае если все ключи будут равны 
 * x * m + c - где x - случайное число, m - количество корзин, c - константа, тоесть все ключи будут отличаться друг от друга на величину xm
 * 
 * На практике при тестировании было замечено что коэффициент заполнения не превышал 1.25
 * 
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * Алгоритм потребляет память для хранения массива корзин (m) и связанных списков,
 * количество узлов связанных списков не превышает количества обрабатываемых элементов.
 * Итого O(n+m), что соответствует O(n)
*/

class Node {
    /**
     * Создает экземпляр Node для использования в структуре данных типа связный список
     * 
     * @param {number|null} key - Ключ узла, обычно используемый для сопоставления с значением
     * @param {number} value - Значение, хранящееся в узле
     * @param {Node|null} next - Ссылка на следующий узел в связном списке. Если следующего узла нет, то null
     */
    constructor(key = null, value = null, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }

    /**
     * Добавить элемент в цепочку
     * @param {number} key 
     * @param {number} value 
     */
    addToChain(key, value) {
        // Если головная нода имеет искомый ключ, то перезаписываем ее
        if(this?.key === key) {
            this.key = key
            this.value = value
        } else {
            let currentNode = this
            while(currentNode) {
                if(currentNode.key === key) {
                    currentNode.key = key
                    currentNode.value = value

                    break
                }
                if(!currentNode.next) {
                    currentNode.next = new Node(key, value)

                    break
                }

                currentNode = currentNode.next
            }
        }
    }

    /**
     * Достать элемент из цепочки
     * @param {number} key 
     * @return number | undefined
     * */
    find(key) {
        let currentNode = this
        while(currentNode) {
            if(currentNode.key === key) {
                return currentNode.value
            }

            currentNode = currentNode.next
        }

        return
    }

    /**
     * Удаляет узел из цепочки по ключу.
     * @param {number} key - Ключ узла, который нужно удалить
     * @returns number | undefined
     */
    deleteFromChain(key) {
        if (this.key === key) {
            // Если ключ находится в текущем узле (голове списка), заменяем его на следующий
            const v = this.value

            this.key = this.next?.key ?? null;
            this.value = this.next?.value ?? null;
            this.next = this.next?.next ?? null;

            return v
        } else {
            let currentNode = this;
            while (currentNode.next) {
                if (currentNode.next.key === key) {
                    const v = currentNode.next.value
                    currentNode.next = currentNode.next.next;

                    return v
                }

                currentNode = currentNode.next;
            }
        }

        return
    }
}


class HashMap {
    /**
     * @param {number} maxCount 
     */
    constructor(maxCount) {
        this.maxCount = maxCount

        /**
         * @type {Node[]} space - Массив, используемый для хранения данных
         */
        this.space = new Array(this._basketCount)
    }

    /**
     * Добавить элемент
     * @param {number} key 
     * @param {number} value 
     */
    put(key, value) {
        const h = this._getHash(key)
        const ind = this._getBasket(h)

        if(!this.space[ind]) {
            this.space[ind] = new Node(key, value)
        } else {
            this.space[ind].addToChain(key, value)
        }
    }

    /**
     * Получить элемент по ключу
     * @param {number} key 
     * @returns number | undefined
     */
    get(key) {
        const h = this._getHash(key)
        const ind = this._getBasket(h)

        return this.space[ind]?.find(key)
    }

    /**
     * Удалить элемент по ключу
     * Вернет значение, если удалось удалить элемент
     * @param {number} key 
     * @returns number | undefined
     */
    delete(key) {
        const h = this._getHash(key)
        const ind = this._getBasket(h)
        
        return this.space[ind]?.deleteFromChain(key)
    }

    /**
     * Получить хеш от значения
     * @param {number} x
     */
    _getHash(x) {
        if(typeof x === 'number') {
            return x
        }
        // Тут можно написать свой способ создания хэша для других типов данных 

        return x
    }

    /** Подбираем количество корзин в зависимости от потенциального количества элементов */
    get _basketCount() {
        const x = this.maxCount

        if(x < 20) {
            return 17
        }
        if(x < 1250) {
            return 997
        }
        if(x < 12500) {
            return 9973
        }
        if(x < 25000) {
            return 19997
        }
        if(x < 50000) {
            return 39989
        }
        if(x < 75000) {
            return 59743
        }

        return 97561
    }

    /**
     * Получить номер корзины для заданного хэша
     * @param {number} h - хэш
     */
    _getBasket(h) {
        return h % this._basketCount
    }

    log() {
        console.log(this)
    }
}

/**
 * 
 * @param {number} count - количество команд => максимально возможное количество элементов в мапе
 * @param {string[]} commands - список команд в формате [команда] [параметр]
 */
function main(count, commands) {
    const map = new HashMap(count);
    
    let resStr = ''
    for(let i = 0; i < commands.length; i++) {
        const command = commands[i]
        const [cmd, keyStr, valueStr] = command.split(' ');
        const key = Number(keyStr)
        const value = Number(valueStr)

        switch(cmd) {
            case 'get': {
                const v = map.get(key)
                const res = typeof v === 'undefined' ? 'None' : v
                resStr += res + '\n'

                break
            }
            case 'delete': {
                const v = map.delete(key)
                const res = typeof v === 'undefined' ? 'None' : v
                resStr += res + '\n'

                break
            }
            case 'put': {
                map.put(key, value)

                break
            }
            default: {

            }
        }
    }

    // process.stdout.write(resStr.trim())
    console.log(resStr)
}

// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const count  = lines[0]

    main(Number(count), lines.slice(1));
});
// ОТЧЕТ: https://contest.yandex.ru/contest/24414/run-report/106260608/

// Описание задания https://contest.yandex.ru/contest/24414/problems/A/


/**
 * -- ПРИНЦИП РАБОТЫ --
 * Алгоритм создает обратный индекс для набора текстовых документов
 * Обратный индекс - это такая организация данных когда, не документу сопоставляется набор слов, а наоборот, каждому слову сопоставляется набор документов
 * Это ключевая часть высокой скорости работы, т.к. на вход запроса будут поступать именно ключевым слова,
 * по которым обратный индекс позволит быстро находить документы
 * 
 * В функции createWordsIndexMap каждое слово из каждого документа добавляется в глобальный индекс.
 * Значение этого глобального индекса - это мапа, где ключ - это идентификатор документа,
 * а значение - количество раз, которое это слово встречается в документе.
 * 
 * Затем функция search  использует этот индекс для определения релевантности каждого документа по отношению к заданному поисковому запросу.
 * Для каждого слова в запросе она находит соответствующие записи в индексе и суммирует количество их вхождений в каждом документе
 * Результаты сортируются по убыванию релевантности
 * 
 * 
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * Корректность алгоритма обусловлена правильным подсчетом частоты слов в документах и соответствующим использованием этих данных
 * при оценке релевантности. Поскольку каждое вхождение слова учитывается при построении индекса,
 * поиск по этому индексу даёт точную оценку частоты слов в документах
 * 
 * 
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * Сложность создания индекса - O(N), где N - общее количество слов во всех документах.
 * Потому что для создания индекса нужно пройти по каждому слову,
 * при этом операция добавления и извлечения данных из Map занимает O(1)
 * 
 * Сложность поиска по запросу - O(M*K),
 * где M - количество уникальных слов в запросе, а K - количество документов, в которых встречается хотя бы одно из слов запроса
 * 
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * Пространственная сложность индекса составляет O(M*K), 
 * где M - количество уникальных слов в документах, а K - количество всех документов
 */

/**
 * Создает индекс по массиву документов. Каждое слово в документе становится ключом,
 * а значение - это мапа документов, где ключ - номер документа, а значение - количество повторений слова в доке
 * 
 * @param {string[]} documents Массив строк, представляющих документы
 * @returns {Map<string, Map<number, number>>} Индекс
 */
function createWordsIndexMap(documents) {
    const wordsIndexMap = new Map();
    
    documents.forEach((docText, docId) => {
        docText.split(' ').forEach(word => {
            // Если слово встречается впервые
            if (!wordsIndexMap.has(word)) {
                wordsIndexMap.set(word, new Map());
            }

            const docsMap = wordsIndexMap.get(word);
            // Если это слово встретилось впервые в этом документе, то добавляем счетчик для него
            if(!docsMap.has(docId)) {
                docsMap.set(docId, 0);
            }

            // Увеличиваем счетчик количество повторений в документе
            docsMap.set(docId, docsMap.get(docId) + 1);
        });
    });

    return wordsIndexMap;
}

/**
 * Выполняет поиск по заданному запросу в созданном индексе документов и возвращает
 * идентификаторы документов, отсортированные по релевантности (количество совпадений).
 * 
 * @param {string} query Строка запроса для поиска.
 * @param {Map<string, Map<number, number>>} index Индекс, созданный функцией createWordsIndexMap.
 * @param {number} numDocuments Количество документов.
 * @returns {number[]} Массив идентификаторов документов.
 */
function search(query, index, numDocuments) {
    const relevance = new Array(numDocuments).fill(0);

    // Чтобы не фильтровать повторяющиеся в запросе слова используем Set,
    // который сохранит только уникальные значения
    new Set(query.split(' ')).forEach(word => {
        if (index.has(word)) {
            index.get(word).forEach((count, docId) => {
                relevance[docId] += count;
            });
        }
    });

    return relevance.map((score, docId) => ({docId: docId + 1, score}))
        .filter(({docId, score}) => score)
        .sort((a, b) => b.score - a.score || a.docId - b.docId)
        .slice(0, 5)
}

/**
 * Главный метод
 * @param {string[]} documents Массив документов для индексации
 * @param {string[]} queries Массив поисковых запросов
 */
function main(documents, queries) {
    const index = createWordsIndexMap(documents);
    queries.forEach(query => {
        const result = search(query, index, documents.length)
            .map(({docId, score}) => docId);
        console.log(result.join(' '));
    });
}

// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [countDocuments] = lines.splice(0, 1);
    const documents = lines.splice(0, countDocuments);
    const [countQueries] = lines.splice(0, 1);
    const queries = lines.splice(0, lines.length);

    main(documents, queries);
});

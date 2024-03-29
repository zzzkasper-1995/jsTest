// Отчет: https://contest.yandex.ru/contest/23815/run-report/106064519/

// Описание задачи: https://contest.yandex.ru/contest/23815/problems/A/

/**
-- ПРИНЦИП РАБОТЫ --
Метод поиска в "сломанном" массиве использует модифицированный алгоритм бинарного поиска

Последовательность:
1) Определения середину массива 
2) Сравниваем срединный элемент (midInd) с самым левым (leftInd), если он больше или равен, то значит правая часть отсортирована верно, а правая имеет сдвиг, если нет то все наоборот
3) Выбираем отсортированную часть массива и проверяем находится ли искомый элемент (k) в диапазоне от минимального элемента этой части до максимального (arr[leftInd] <= k < arr[midInd])
4) Если искомый элемент в диапазоне, то продолжаем искать в этой части, если искомый элемент не в диапазоне, то продолжаем поиск в правой части 

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Алгоритм работает, потому что он использует факт, что хотя массив "сломан", одна из половин (от начала до середины или от середины до конца) всегда 
остается отсортированной. Мы можем использовать обычный бинарный поиск на этой отсортированной половине. Алгоритм определяет, в какой половине 
находится искомый элемент, и применяет бинарный поиск только в этой половине

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Временная сложность метода составляет O(log n), что соответствует временной сложности бинарного поиска. Это связано с тем, что на каждом шаге алгоритма 
размер рассматриваемого диапазона уменьшается вдвое

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Пространственная сложность метода составляет O(1), так как поиск осуществляется без выделения дополнительной памяти для хранения частей массива 
или других структур данных

Используются только доп переменные для хранения индексов и значений, но ими можно принебречь при определении пространственной сложности
*/


/**
 * Функция поиска в сломанном отсортированном массиве
 * @param {number[]} arr - массив в котором ищем
 * @param {тгьиук} k - Искомое значение
 */
function brokenSearch(arr, k) {
    // Индекс первого элемента рассматриваемого отрезка массива
    let leftInd = 0;
    // Индекс последнего элемента рассматриваемого отрезка массива
    let rightInd = arr.length - 1;

    while (leftInd <= rightInd) {
        let midInd = Math.floor((leftInd + rightInd) / 2);

        if (arr[midInd] === k) {
            return midInd;
        }

        // Проверяем, в какой части массива мы находимся
        // Левая часть отсортирована
        if (arr[leftInd] <= arr[midInd]) { 
            /** Мы находимся в отсортированной части массива,
            и следовательно, наш элемент должен быть больше минимального и меньше максимального  */
            if (k >= arr[leftInd] && k < arr[midInd]) {
                // Делаем вывод, что искомый элемент находится в левой части
                rightInd = midInd - 1; 
            } else {
                leftInd = midInd + 1;
            }
        }
        // Правая часть отсортирована
        else { 
            if (k > arr[midInd] && k <= arr[rightInd]) {
                // Делаем вывод, что искомый элемент находится в правой части
                leftInd = midInd + 1;
            } else {
                rightInd = midInd - 1;
            }
        }
    }

    return -1;
}

// Пример использования
const array = [19, 21, 100, 101, 1, 4, 5, 7, 12];
const k = 5;
const index = brokenSearch(array, k);
console.log(index);

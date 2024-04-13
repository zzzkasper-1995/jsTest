// Задание: https://contest.yandex.ru/contest/25596/problems/A/

/**
 * A. Биржа
 * 
 * Рита хочет попробовать поиграть на бирже. Но для начала она решила потренироваться на исторических данных.
 * Даны стоимости акций в каждый из n дней. В течение дня цена акции не меняется. Акции можно покупать и продавать, но только по одной штуке в день. В один день нельзя совершать более одной операции (покупки или продажи). Также на руках не может быть более одной акции в каждый момент времени.
 * Помогите Рите выяснить, какую максимальную прибыль она могла бы получить.
 * Пояснения к примерам
 * 
 * Пример:
 * Рита покупает акции в дни с номерами 1, 3 и 5. Продаёт в дни 2, 4 и 6. Итоговая прибыль составит (12 - 1) + (16 - 12) + (8 - 1) = 22. Такой же результат можно получить в виде: 22 = (16 - 1) + (8 - 1), если покупать акции в дни 1 и 5, а продавать в дни 4 и 6. */

/**
 * 
 * @param {number[]} prices
 */
function main(prices) {
    let summ = 0
    let current = prices[0]
    for(let i = 1; i < prices.length ; i++) {
        if(current > prices[i]) {
            current = prices[i]
            continue
        }

        if(prices[i+1]>prices[i]) {
            continue
        }

        summ += prices[i] - current
        current = Infinity
    }

    return `${summ}`
}


// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [_, stockPrices]  = lines

    process.stdout.write(main(stockPrices.split(' ').map(Number)));
});
// https://contest.yandex.ru/contest/26131/problems/E/

/**
 * E. Вставка строк
 * 
 * У Риты была строка s, Гоша подарил ей на 8 марта ещё n других строк ti, 1≤ i≤ n. Теперь Рита думает, куда их лучше поставить. Один из вариантов —– расположить подаренные строки внутри имеющейся строки s, поставив строку ti сразу после символа строки s с номером ki (в частности, если ki=0, то строка вставляется в самое начало s).
 * Помогите Рите и определите, какая строка получится после вставки в s всех подаренных Гошей строк.
 */

/**
 * 
 * @param {string} str 
 * @param {[string, number][]} giftedStrs 
 */
function main(str, giftedStrs) {
    if(giftedStrs.length === 0) {
        return str
    }

    let res = ''
    const sortGiftedStrs = giftedStrs.sort((a,b) => a[1] - b[1])
    let giftStr = sortGiftedStrs.pop()

    for(let i = str.length; i >= 0; i--) {
        const symbol = str[i] || ''

        if(giftStr && giftStr[1] === i) {
            res = giftStr[0] + symbol + res
            giftStr = sortGiftedStrs.pop()
        } else {
            res = symbol + res
        }
    }

    return res
}


// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [str, _, ...giftedStrs]  = lines

    console.log(
        main(
            str,
            giftedStrs.map(el => {
                const [s, position] = el.split(' ')
                return [s, Number(position)]
            })
        )
    );
});
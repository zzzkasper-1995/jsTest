// https://contest.yandex.ru/contest/26131/problems/B/

/**
 * B. Пограничный контроль
 * 
 * Представьте, что вы работаете пограничником и постоянно проверяете документы людей по записи из базы. При этом допустима ситуация, когда имя человека в базе отличается от имени в паспорте на одну замену, одно удаление или одну вставку символа. Если один вариант имени может быть получен из другого удалением одного символа, то человека пропустят через границу. А вот если есть какое-либо второе изменение, то человек грустно поедет домой или в посольство.
 * Например, если первый вариант —– это «Лена», а второй — «Лера», то девушку пропустят. Также человека пропустят, если в базе записано «Коля», а в паспорте — «оля».
 */

/**
 * 
 * @param {string} _str1 
 * @param {string} _str2 
 */
function main(_str1, _str2) {
    // Короткая строка
    let str1 = _str1
    // Более длинная строка
    let str2 = _str2
    if(_str1.length > _str2.length) {
        str1 = _str2
        str2 = _str1
    }

    let leftInd = 0
    let rightRevertInd = 0
    
    while(str1[leftInd] === str2[leftInd]) {
        leftInd += 1
        if(str2.length === leftInd) {
            break
        }
    }
    while(str2.length - 1 - rightRevertInd >= leftInd && str1[str1.length - 1 - rightRevertInd] === str2[str2.length - 1 - rightRevertInd ]) {
        rightRevertInd += 1

        if(str2.length === rightRevertInd) {
            break
        }
    }

    return leftInd >= str2.length - 1 - rightRevertInd ? 'OK' : 'FAIL'
}


// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [str1, str2]  = lines


    process.stdout.write(main(str1, str2));
});
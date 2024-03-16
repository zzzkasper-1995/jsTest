// https://contest.yandex.ru/contest/23991/problems/H/

const map = {}
const reversMap = {}
function addAlfabet(a, b) {
    if(!map[a] && !reversMap[b]) {
        map[a] = b
        reversMap[b] = a
    } else if(map[a] !== b || reversMap[b] !== a) {
        throw new Error('uncorect')
    }
}

/**
 * 
 * @param {string} str1 
 * @param {string} str2 
 */
function main(str1, str2) {
   
    if(str1.length !== str2.length) {
        return "NO"
    }

    for(let i = 0; i < str1.length; i++) {
        const s1 = str1[i]
        const s2 = str2[i]

        try {
            addAlfabet(s1, s2)
        } catch {
            // console.log('map', map)
            // console.log('mapR', reversMap)
            return "NO"
        }
    }

    return "YES"
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

   console.log(main(str1, str2))
});
const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin
});

const _inputLines = [];

_reader.on('line', line => {
    _inputLines.push(line);
});

process.stdin.on('end', extraLetter);

/** Нахождение значения квадратичного уравнения в точке Х */
function functionValue() {
    const variables = _inputLines[0].split(' ').map(Number)
    const [a,x,b,c] = variables

    const res =a*x*x+b*x+c

    process.stdout.write(`${res}`);
}

/** Данны три числа, если все они одной четности то WIN иначе FAIL */
function parity() {
    const variables = _inputLines[0].split(' ').map(el=>Math.abs(Number(el)))

    let prevParity = variables[0]%2
    for(let i=1; i<3; i++){
        if(variables[i]%2!==prevParity) {
            res = 'FAIL'
            process.stdout.write(res);
            return res
        }
    }

    res = 'WIN'
    process.stdout.write(res);
    return res
}

/** Нужно написать функцию, которая для элемента возвращает всех его соседей. */
function neighbords() {
    const [yLen, xLen, ...other] = _inputLines
    const [y, x] = other.splice(-2).map(Number)
    const matrixLines = other

    const prevLine = matrixLines[y-1]?.split(' ')
    const curLine = matrixLines[y]?.split(' ')
    const nextLine = matrixLines[y+1]?.split(' ')

    const res = []

    if(typeof curLine?.[x+1] !== 'undefined') {
        res.push(curLine[x+1])
    }
    if(typeof prevLine?.[x] !== 'undefined') {
        res.push(prevLine[x])
    }
    if(typeof curLine?.[x-1] !== 'undefined') {
        res.push(curLine[x-1])
    }
    if(typeof nextLine?.[x] !== 'undefined') {
        res.push(nextLine[x])
    }

    process.stdout.write(res.map(Number).sort((a, b)=>a-b).join(' '));
}


/** Данны три числа, если все они одной четности то WIN иначе FAIL */
function theMostLen() {
    const words = _inputLines[1].split(' ').map(el=>el.trim())

    let theWord = words[0]
    let theWordLen = theWord.length
    for(let i = 0; i < words.length; i++) {
        if(words[i].length > theWordLen) {
            theWord = words[i]
            theWordLen = words[i].length
        }
    }

    console.log('theWord', theWord)
    process.stdout.write(`${theWord}\n${theWordLen}`)

    return
}

/** Палиндром */
function palyndrom() {
    const line = _inputLines[0].toLowerCase().replace(/[^a-zа-я0-9]+/g, "");

    let res = true
    for(let i = 0; i < line.length/2; i++) {
        if(line[i]===line[line.length-1-i]) {
            continue
        } else {
            res = false
            break 
        }
    }

    process.stdout.write(res ? 'True' : 'False')

    return
}

/** Найти лишнюю букву в строке */
function extraLetter() {
    const line1 = _inputLines[0]
    const line2 = _inputLines[1]

    console.log('line1', line1)
    console.log('line2', line2)
    let letterMap = {}
    for(let i = 0; i < line1.length; i++) {
        const letter = line1[i]
        if(!letterMap[letter]) {
            letterMap[letter] = 1
        } else {
            letterMap[letter] += 1
        }
    }


    let res = ''
    for(let i = 0; i < line2.length; i++) {
        const letter = line2[i]
        if(letterMap[letter]) {
            letterMap[letter] -= 1
        } else {
            res = letter
            break
        }
    }

    process.stdout.write(res)

    return
}
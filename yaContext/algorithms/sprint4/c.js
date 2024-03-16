function roll(previousHash, previousPattern, newPattern, base, Q) {
    let hashCode = previousHash;
    let multiplier = 1;
    for (let i = 1; i < previousPattern.length; i++) {
        multiplier *= base;
        multiplier %= Q;
    }
    hashCode += Q;
    hashCode -= (multiplier * previousPattern.charCodeAt(0)) % Q;
    hashCode *= base;
    hashCode += newPattern.charCodeAt(newPattern.length - 1);  
    hashCode %= Q;

    return hashCode;
}

function calculateSubstringHashes(str, windowSize, base, Q) {
    let hashes = [];
    if (str.length < windowSize) return hashes;

    let currentHash = 0;
    for (let i = 0; i < windowSize; i++) {
        currentHash = (currentHash * base + str.charCodeAt(i)) % Q;
    }
    hashes.push(currentHash);

    for (let i = windowSize; i < str.length; i++) {
        currentHash = roll(currentHash, str.substring(i - windowSize, i), str[i], base, Q);
        hashes.push(currentHash);
    }

    return hashes;
}



function main(a, m, str, startInd, lastIndex) {
    const n = lastIndex - startInd

    const hashes = calculateSubstringHashes(str, n, a, m);
    

    return hashes[startInd-1];
}

const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [aStr, mStr, str, count, ...params]  = lines

    params.forEach(param => {
        const [strarIndStr, lastIndStr] = param.split(' ')
        // console.log('param', param)
        const res = main(Number(aStr), Number(mStr), str, Number(strarIndStr) - 1, Number(lastIndStr))

        process.stdout.write(`${res}\n`);
    })
});

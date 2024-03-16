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

function calculateSubstringHashes(str, windowSize) {
    const base = 31;
    const Q = 1e9 + 9;
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

function main(symbolArr, n, k) {
    const map = new Map();
    let res = '';

    const hashes = calculateSubstringHashes(symbolArr, n);

    for (let i = 0; i <= hashes.length; i++) {
        const hash = hashes[i];
        const v = map.get(hash);

        if (!v) {
            map.set(hash, {
                startInd: i,
                count: 1
            });
        } else {
            const newCount = v.count + 1;

            if (newCount === k) {
                res += ` ${v.startInd}`
                map.set(hash, {...v, count: newCount + 1}) 
            } else if (newCount < k) {
                map.set(hash, { ...v, count: newCount });
            }
        }
    }

    process.stdout.write(res.trim() + '\n');
}

// Блок ввода/вывода данных
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });
let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [arg, str] = lines;
    const [n, k] = arg.split(' ');

    main(str, Number(n), Number(k));
});

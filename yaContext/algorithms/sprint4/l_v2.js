/**
 * Дана длинная строка, состоящая из маленьких латинских букв.
 * Нужно найти все её подстроки длины n, которые встречаются хотя бы k раз.
 */

const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

const _inputLines = [];
let _curLine = 0;

_reader.on("line", (line) => {
  _inputLines.push(line);
});

process.stdin.on("end", solve);

const getPolynomialHash = (base, mod, string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = (hash * base + string[i].charCodeAt()) % mod;
  }
  return hash;
};

const getCoeff = (base, mod, n) => {
  let coeff = 1;
  for (let i = 1; i <= n; i++) {
    coeff = (coeff * base) % mod;
  }
  return coeff;
};

const frequentSusbstring = (length, times, string) => {
  const base = 26;
  const mod = 1000000003;
  const nBase = getCoeff(base, mod, length - 1);
  let hash = getPolynomialHash(base, mod, string.slice(0, length));
  const hashes = { [hash]: [0] };
  const frequentHashes = new Set();
  for (let i = 0; i < string.length - length; i++) {
    hash =
      (((hash + mod - ((string[i].charCodeAt() * nBase) % mod)) % mod) * base +
        string[i + length].charCodeAt()) %
      mod;
    if (hash in hashes) {
      if (string.slice(i + 1, i + length + 1) !== string.slice(hashes[hash][0], hashes[hash][0] + length))
        continue;
      hashes[hash].push(i + 1);
      if (hashes[hash].length >= times) frequentHashes.add(hashes[hash][0]);
    } else {
      hashes[hash] = [i + 1];
    }
  }

  return frequentHashes;
};

function solve() {
  const [length, times] = readIntArray();
  const string = readLine();

  console.log([...frequentSusbstring(length, times, string)].join(" "));
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}

function readIntArray() {
  const arr = _inputLines[_curLine].trim(" ").split(" ").map(Number);
  _curLine++;
  return arr;
}
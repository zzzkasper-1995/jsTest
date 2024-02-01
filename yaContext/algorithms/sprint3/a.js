function generateParenthesis(n) {
    const result = [];

    function backtrack(s = '', open = 0, close = 0) {
        if (s.length === 2 * n) {
            result.push(s);
            return;
        }
        if (open < n) backtrack(s + '(', open + 1, close);
        if (close < open) backtrack(s + ')', open, close + 1);
    }

    backtrack();

    return result;
}

const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const n = parseInt(lines[0], 10);
    
    console.log(generateParenthesis(n).join('\n'));
});
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const n = parseInt(lines[0], 10); // Количество матчей первой команды
    const team1 = lines[1].split(' ').map(Number); // Очки в играх первой команды
    const m = parseInt(lines[2], 10); // Количество матчей второй команды
    const team2 = lines[3].split(' ').map(Number); // Очки в играх второй команды

    console.log(findLongestMatchingSegment(n, team1, m, team2));
});

function findLongestMatchingSegment(n, team1, m, team2) {
    let dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    let maxLen = 0;

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (team1[i - 1] === team2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                maxLen = Math.max(maxLen, dp[i][j]);
            }
        }
    }

    return maxLen;
}

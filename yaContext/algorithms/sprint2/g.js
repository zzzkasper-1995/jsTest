// Описание тут: https://contest.yandex.ru/contest/22779/problems/G

class Node {
    constructor(value = null, prev = null, max = null) {
        this.value = value;
        this.prev = prev;

        this.max = max === null ? value : max
    }
}

class Stack {
    constructor() {
        this.lastNode = null
    }

    push(valueStr) {
        const value = Number(valueStr)
        this.lastNode = new Node(value, this.lastNode, this.lastNode ? Math.max(this.lastNode?.max, value) : value)
    }

    pop() {
        if(!this.lastNode) {
            console.log('error')
            return
        }

        this.lastNode = this.lastNode.prev
    }

    top() {
        if(!this.lastNode) {
            console.log('error')
            return
        }

        console.log(this.lastNode.value)
    }

    get_max() {
        if(!this.lastNode) {
            console.log('None')
            return
        }

        console.log(this.lastNode.max)
    }
}


const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

let lines = [];

io_interface.on('line', function (line) {
    lines.push(line);
});

io_interface.on('close', function () {
    const [countComand, ...comands] = lines;

    const stack = new Stack()
    comands.forEach(comand=>{
        const [cmd, arg] = comand.split(' ');
        stack[cmd]?.(arg)
    })
});
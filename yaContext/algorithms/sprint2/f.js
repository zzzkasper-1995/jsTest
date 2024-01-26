// Описание тут: https://contest.yandex.ru/contest/22779/problems/F/

class Stack {
    constructor() {
        this.stack = []
    }

    push(x) {
        this.stack.push(Number(x))
    }

    pop() {
        if(!this.stack.length) {
            console.log('error')
            return
        }

        this.stack.pop()
    }

    top() {
        if(!this.stack.length) {
            console.log('error')
            return
        }

        console.log(this.stack[this.stack.length-1])
    }

    get_max() {
        if(!this.stack.length) {
            console.log('None')
            return
        }

        let max = this.stack[0]
        for(let i = 0; i< this.stack.length; i++) {
            max = this.stack[i] > max ? this.stack[i] : max
        }

        console.log(max)
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
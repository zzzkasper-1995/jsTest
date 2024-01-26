// Описание тут: https://contest.yandex.ru/contest/22779/problems/D/

class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}


function solution(node, elem) {
    let res = -1

    let ind = 0
    let currentNode = node
    while(res === -1 && currentNode) {
        if(currentNode.value === elem) {
            res = ind
            break
        }

        ind+=1
        currentNode = currentNode.next
    }

    return res
}

function test() {
    var node3 = new Node("node3");
    var node2 = new Node("node2", node3);
    var node1 = new Node("node1", node2);
    var node0 = new Node("node0", node1);
    var idx = solution(node0, "node2");

    console.log(idx)

}

test()
// Описание тут: https://contest.yandex.ru/contest/22779/problems/C/

    class Node {
      constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
      }
    }


function solution(head, ind) {
    if(ind === 0) {
        return head.next;
    }

    let currentNode = head;
    for(let i = 0; i < ind - 1; i++) {
        currentNode = currentNode.next;
        if(!currentNode.next) {
            return head;
        }
    }

    currentNode.next = currentNode.next.next;

    return head;
}

function test() {
    var node3 = new Node("node3");
    var node2 = new Node("node2", node3);
    var node1 = new Node("node1", node2);
    var node0 = new Node("node0", node1);
    var newHead = solution(node0, 1);
    // result is node0 -> node2 -> node3
}

test()
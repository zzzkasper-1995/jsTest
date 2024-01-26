// https://contest.yandex.ru/contest/22779/problems/E/


class Node {
    constructor(value = null, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
    }
}

function solution(node) {
    function outputList(node) {
        let currentNode = node
    
        while(currentNode) {
            console.log(currentNode.value);
            currentNode = currentNode.next;
        }
    }

    let currentNode = node;
    let newHead = null;
  
    while (currentNode != null) {

      const prevNode = currentNode.prev;
  

      currentNode.prev = currentNode.next;
      currentNode.next = prevNode;
  

      newHead = currentNode;
  

      currentNode = currentNode.prev;
    }

    outputList(newHead)
  
    return newHead;
  }

function test() {
    var node3 = new Node("node3");
    var node2 = new Node("node2", node3);
    var node1 = new Node("node1", node2);
    var node0 = new Node("node0", node1);
    node1.prev = node0;
    node2.prev = node1;
    node3.prev = node2;
    var newHead = solution(node0);

    console.log('newHead', newHead)
    /*
    result is newHead === node3
    node0.prev === node1
    node1.next === node0
    node1.prev === node2
    node2.next === node1
    node2.prev === node3
    node3.next === node2
    */
}


test()
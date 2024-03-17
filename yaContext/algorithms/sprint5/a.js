// https://contest.yandex.ru/contest/24809/problems/?success=109877805#3484683/2020_06_03/laeEtu3Fg4

/**
 * Найти узел с наибольшим значением
 */


    class CNode {
        constructor(value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }


function solution(root) {
    let max = root.value

    function find(node) {
        if(node.value > max) {
            max = node.value
        }

        if(node.left) {
            find(node.left)
        }
        if(node.right) {
            find(node.right)
        }
    }

    find(root)

    return max
}

function main() {
    var node1 = new CNode(1);
    var node2 = new CNode(-5);
    var node3 = new CNode(3);
    node3.left = node1;
    node3.right = node2;
    var node4 = new CNode(2);
    node4.left = node3;

    solution(node4)
}


main()
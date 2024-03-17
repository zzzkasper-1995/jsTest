// https://contest.yandex.ru/contest/24809/problems/E/

/** Определить является ли дерево деревом поиска */

class CNode {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function solution(root) {
    function getMaxValue(node) {
        let leftMeta, rightMeta

        let leftIsBinary = true
        if(typeof node.left?.value === 'number') {
            leftMeta = getMaxValue(node.left)
            leftIsBinary = leftMeta.isBinary && leftMeta.maxValue < node.value
        }

        let rightIsBinary = true
        if(typeof node.right?.value === 'number') {
            rightMeta = getMaxValue(node.right)
            rightIsBinary = rightMeta.isBinary && rightMeta.maxValue > node.value
        }

        return {
            isBinary: leftIsBinary && rightIsBinary,
            maxValue: Math.max(
                ...[
                    leftMeta?.maxValue,
                    rightMeta?.maxValue,
                    node.value
                ].filter(v => typeof v === 'number')
            )
        }
    }

    return getMaxValue(root).isBinary
}

function test() {
    var node1 = new CNode(1, null, null);
    var node2 = new CNode(4, null, null);
    var node3 = new CNode(3, node1, node2);
    var node4 = new CNode(8, null, null);
    var node5 = new CNode(5, node3, node4);
    console.log(solution(node5));
    node4.value = 5;
    console.log(!solution(node5));
}

test()
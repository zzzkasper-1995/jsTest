// https://contest.yandex.ru/contest/24809/problems/C/

/**
 * C. Дерево - анаграмма
 * 
 * Гоша и Алла играют в игру «Удивительные деревья». Помогите ребятам определить, является ли дерево, которое им встретилось, деревом-анаграммой?
 * Дерево называется анаграммой, если оно симметрично относительно своего центра.
 */


class CNode {
    /**
     * 
     * @param {number} value 
     * @param {CNode} left 
     * @param {CNode} right 
     */
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

/**
 * 
 * @param {CNode} root 
 * @param {'left' | 'right'} side 
 * @returns 
 */
function getTreeStackValues(root, side) {
    if(typeof root?.value !== 'number') {
        return ['None']
    }

    const l = getTreeStackValues(root?.left, side)
    const r = getTreeStackValues(root?.right, side)

    if(side === 'left') {
        return [root?.value, ...l, ...r]
    } else  {
        return [root?.value, ...r, ...l]
    }
}

/**
 * 
 * @param {CNode | undefined} root 
 * @returns 
 */
function solution(root) {
    const leftNode = root?.left
    const rightNode = root?.right

    const leftRes =  getTreeStackValues(leftNode, 'left')
    const rightRes =  getTreeStackValues(rightNode, 'right')

    if(leftRes.length !== rightRes.length) {
        return false
    }

    for(let i = 0; i < leftRes.length; i++) {
        if(leftRes[i] !== rightRes[i]) {
            return false
        }
    }

    return true
}


function test1() {
    var node1 = new CNode(3,  null,  null);
    var node2 = new CNode(4,  null,  null);
    var node3 = new CNode(4,  null,  null);
    var node4 = new CNode(3,  null,  null);
    var node5 = new CNode(2, node1, node2);
    var node6 = new CNode(2, node3, node4);
    var node7 = new CNode(1, node5, node6);

    // console.log('test1', solution(node7))
    console.assert(solution(node7));
}

function test4() {
    var node3 = new CNode(1,  null,  null);
    var node1 = new CNode(1, node3, null);
    var node2 = new CNode(1, null, null);
    var node0 = new CNode(1, node1, node2);

    // console.log('test4', solution(node0))
    console.assert(solution(node0));
}


function test7() {
    var node8 = new CNode(0,  null,  null);
    var node7 = new CNode(1,  null,  null);
    var node6 = new CNode(1,  null,  null);
    var node5 = new CNode(0,  null,  null);
    var node4 = new CNode(3, node7, node8);
    var node3 = new CNode(3, node5, node6);
    var node2 = new CNode(2, null, node4);
    var node1 = new CNode(2, node3, null);
    var node0 = new CNode(0, node1, node2);

    // console.log('test7', solution(node0))
    console.assert(solution(node0));
}

test7()
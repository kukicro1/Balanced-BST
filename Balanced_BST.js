class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor(array) {
    this.array = array
    this.root = this.buildTree(this.array, 0, this.array.length - 1)
  }

  buildTree(array, start, end) {
    if (start > end) {
      return null
    }
    let mid = Math.floor((start + end) / 2)
    let node = new Node(array[mid])
    node.left = this.buildTree(array, start, mid - 1)
    node.right = this.buildTree(array, mid + 1, end)
    return node
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      )
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
    }
  }

  insert(root, input) {
    if (root.data > input) {
      if (root.left === null) {
        root.left = new Node(input)
        return
      }
      return this.insert(root.left, input)
    } else if (root.data < input) {
      if (root.right === null) {
        root.right = new Node(input)
        return
      }
      return this.insert(root.right, input)
    }
  }

  delete(root, input, previousNode = null) {
    if (root.data > input) {
      this.delete(root.left, input, (previousNode = root))
      return
    } else if (root.data < input) {
      this.delete(root.right, input, (previousNode = root))
      return
    } else {
      if (root.left == null) {
        if (previousNode.right?.data === input)
          return (previousNode.right = root.right)
        else if (previousNode.left?.data === input)
          return (previousNode.left = root.right)
      } else if (root.right == null) {
        if (previousNode.right?.data === input)
          return (previousNode.right = root.left)
        else if (previousNode.left?.data === input)
          return (previousNode.left = root.left)
      }
      root.data = this.minValue(root.right)
      this.delete(root.right, root.data, (previousNode = root))
    }
  }

  minValue(root) {
    let min = root.data
    while (root.left != null) {
      min = root.left.data
      root = root.left
    }
    return min
  }

  find(root, input) {
    if (root === null || root.data === input) return root
    if (root.data > input) return this.find(root.left, input)
    else if (root.data < input) return this.find(root.right, input)
    else return console.log('Input is not valid')
  }

  levelOrder(callback) {
    const queue = [this.root]
    const levelOrderQueue = []
    if (this.root === null) return
    while (queue.length > 0) {
      const currentNode = queue.shift()
      callback ? callback(currentNode) : levelOrderQueue.push(currentNode?.data)
      if (currentNode?.right != null) queue.push(currentNode?.right)
      if (currentNode?.left != null) queue.push(currentNode?.left)
    }
    return console.log(levelOrderQueue)
  }

  // left, root, right
  inOrder(callback, currentNode = this.root, inOrderArray = []) {
    if (callback === 'function') return callback()
    if (currentNode === null) return
    else {
      this.preOrder(callback, currentNode.left, inOrderArray)
      inOrderArray.push(currentNode.data)
      this.preOrder(callback, currentNode.right, inOrderArray)
      return inOrderArray
    }
  }

  // root, left, right
  preOrder(callback, currentNode = this.root, preOrderArray = []) {
    if (callback === 'function') return callback()
    if (currentNode === null) return
    else {
      preOrderArray.push(currentNode.data)
      this.preOrder(callback, currentNode.left, preOrderArray)
      this.preOrder(callback, currentNode.right, preOrderArray)
      return preOrderArray
    }
  }

  //left, right, root
  postOrder(callback, currentNode = this.root, postOrderArray = []) {
    if (callback === 'function') return callback()
    if (currentNode === null) return
    else {
      this.preOrder(callback, currentNode.left, postOrderArray)
      this.preOrder(callback, currentNode.right, postOrderArray)
      postOrderArray.push(currentNode.data)
      return postOrderArray
    }
  }

  height(node = this.root) {
    if (node === null) return 0
    const leftHalf = this.height(node.left)
    const rightHalf = this.height(node.right)
    return Math.max(leftHalf, rightHalf) + 1
  }

  depth(root, input, counter = 0) {
    counter++
    if (this.root === root) return console.log((counter = 0))
    if (root === null || root.data === input) return root, console.log(counter)
    if (root.data > input) return this.depth(root.left, input, counter)
    else if (root.data < input) return this.depth(root.right, input, counter)
  }

  isBalanced(node = this.root) {
    if (node === null) return -1
    const leftHalf = this.isBalanced(node.left)
    const rightHalf = this.isBalanced(node.right)
    if (leftHalf != rightHalf) return false
    else if (leftHalf == rightHalf) return true
    return Math.max(leftHalf, rightHalf) + 1
  }

  reBalance() {
    let orderArray = this.inOrder()
    return (this.root = this.buildTree(orderArray, 0, orderArray.length - 1))
  }
}

function removeDuplicate(array) {
  array = array.filter((value, index, array) => array.indexOf(value) === index)
  return array
}

function mergeSort(array, end = array.length) {
  if (end === 1) {
    return array
  }
  if (0 < end) {
    let mid = Math.floor(end / 2)
    let left = array.slice(0, mid)
    let right = array.slice(mid)
    return merge(mergeSort(left), mergeSort(right), left.length, right.length)
  }
}

function merge(A, B, a, b) {
  let i = 0
  let j = 0
  let k = 0
  let C = []
  while (i < a && j < b) {
    if (A[i] < B[j]) {
      C[k++] = A[i++]
    } else if (A[i] > B[j]) {
      C[k++] = B[j++]
    }
  }
  for (; i < a; i++) {
    C[k++] = A[i]
  }
  for (; j < b; j++) {
    C[k++] = B[j]
  }
  return C
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, , 67, 6345, 324]
const filteredArray = removeDuplicate(array)
const sortedArray = mergeSort(filteredArray)

const tree = new Tree(sortedArray)

// console.log(tree.find(tree.root, 4))

tree.insert(tree.root, 2)

// tree.delete(tree.root, 6345)

// tree.levelOrder()

// console.log(tree.inOrder())
// console.log(tree.preOrder())
// console.log(tree.postOrder())

// console.log(tree.height())

// tree.depth(tree.root, 8)

// console.log(tree.isBalanced())
// tree.reBalance()

console.log(tree)
tree.prettyPrint(tree.root)

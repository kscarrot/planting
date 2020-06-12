import { TreeNode } from 'datastructure/tree/BinarySearchTree'

type NumberTree = TreeNode<number>

/**
 * @description 广度优先搜索
 */
const bfs = (root: NumberTree) => {
  const result: number[] = []
  const queue: NumberTree[] = []
  queue.push(root)
  while (queue.length !== 0) {
    const node = queue.shift()
    if (node) {
      result.push(node.value)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
  }
  return result
}

/**
 * @description 深度优先搜索
 */
const dfs = (root: NumberTree) => {
  const result: number[] = []
  const stack: NumberTree[] = []
  stack.push(root)
  while (stack.length !== 0) {
    const node = stack.pop()
    if (node) {
      result.push(node.value)
      if (node.right) stack.push(node.right)
      if (node.left) stack.push(node.left)
    }
  }
  return result
}

/**
 * @description 深度优先搜索,递归版本
 */
const dfsr = (root: NumberTree) => {
  const result: number[] = []
  const dfs = (node: NumberTree) => {
    if (node) {
      result.push(node.value)
      dfs(node.left)
      dfs(node.right)
    }
  }
  dfs(root)
  return result
}

export { bfs, dfs, dfsr }

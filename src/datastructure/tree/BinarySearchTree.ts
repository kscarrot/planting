import { SearchTree } from '../ADT'
import { TreeNode } from '../Node'
import { Comparator, compareFunction } from '../../util'

class BinarySearchTree<T> implements SearchTree<T> {
  private root: TreeNode<T> | null = null
  protected cmp: Comparator<T>
  size: number = 0
  constructor(cmpFn?: compareFunction<T>) {
    this.cmp = new Comparator(cmpFn)
  }

  isEmpty() {
    return this.size === 0
  }

  private find(value: T, curRoot: TreeNode<T> | null): TreeNode<T> | null {
    if (curRoot === null) return null
    if (curRoot.value === value) return curRoot
    const child = this.cmp.lt(value, curRoot.value) ? 'left' : 'right'
    return curRoot[child] ? this.find(value, curRoot[child]) : null
  }

  private findMin(node: TreeNode<T>) {
    let minNode = node
    while (minNode?.left) {
      minNode = minNode.left
    }
    return minNode
  }

  private replaceNodeInParent(curNode: TreeNode<T> | null, newNode: TreeNode<T> | null) {
    const parent = curNode?.parent
    if (parent) {
      parent[curNode === parent.left ? 'left' : 'right'] = newNode
      if (newNode) newNode.parent = parent
    } else {
      this.root = newNode
    }
  }

  insert(value: T, parent?: TreeNode<T> | null) {
    if (parent == null) {
      if (this.root == null) {
        this.root = new TreeNode(value)
        this.size++
        return this
      }
      parent = this.root
    }
    const child = this.cmp.lt(value, parent.value) ? 'left' : 'right'
    if (parent[child]) {
      this.insert(value, parent[child])
    } else {
      parent[child] = new TreeNode(value, parent)
      this.size++
    }
    return this
  }

  delete(value: T) {
    const node = this.find(value, this.root)
    if (node == null) return null
    const temp = node.value
    if (node.left && node.right) {
      const result = this.findMin(node.right)
      this.delete(result.value)
      node.value = result.value
    } else {
      this.replaceNodeInParent(node, node.left ?? node.right)
      this.size--
    }
    return temp
  }

  search(value: T) {
    const node = this.find(value, this.root)
    return node ? node.value : null
  }

  clear() {
    this.root = null
    this.size = 0
  }

  *traverse() {
    function* inorder(root: TreeNode<T> | null): Generator {
      if (root) {
        yield* inorder(root.left)
        yield root.value
        yield* inorder(root.right)
      }
    }
    yield* inorder(this.root)
  }

  [Symbol.iterator] = this.traverse
}

export default BinarySearchTree

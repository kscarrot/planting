import { SearchTree } from '../ADT'
import comparator, { CompareFunction } from '../../util/comparator'

class TreeNodeBisic<T> {
  value: T
  parent: TreeNodeBisic<T> | null = null
  left: TreeNodeBisic<T> | null = null
  right: TreeNodeBisic<T> | null = null
  constructor(value: T, parent?: TreeNodeBisic<T>) {
    this.value = value
    if (parent) this.parent = parent
  }
}

type TreeNode<T> = TreeNodeBisic<T> | null

class BinarySearchTree<T> implements SearchTree<T> {
  private root: TreeNode<T> = null
  protected cmp: comparator<T>
  size: number = 0
  constructor(cmpFn?: CompareFunction<T>) {
    this.cmp = new comparator(cmpFn)
  }

  isEmpty() {
    return this.size === 0
  }

  private find(value: T, curRoot: TreeNode<T>): TreeNode<T> {
    if (curRoot === null) return null
    if (curRoot.value === value) return curRoot
    const child = this.cmp.lt(value, curRoot.value) ? 'left' : 'right'
    return curRoot[child] ? this.find(value, curRoot[child]) : null
  }

  private findMin(node: TreeNodeBisic<T>) {
    let minNode = node
    while (minNode && minNode.left) {
      minNode = minNode.left
    }
    return minNode
  }

  private replaceNodeInParent(curNode: TreeNode<T>, newNode: TreeNode<T>) {
    const parent = curNode && curNode.parent
    if (parent) {
      parent[curNode === parent.left ? 'left' : 'right'] = newNode
      if (newNode) newNode.parent = parent
    } else {
      this.root = newNode
    }
  }

  insert(value: T, parent?: TreeNode<T>) {
    if (!parent) {
      if (!this.root) {
        this.root = new TreeNodeBisic(value)
        this.size++
        return this
      }
      parent = this.root
    }
    const child = this.cmp.lt(value, parent.value) ? 'left' : 'right'
    if (parent[child]) {
      this.insert(value, parent[child])
    } else {
      parent[child] = new TreeNodeBisic(value, parent)
      this.size++
    }
    return this
  }

  delete(value: T) {
    const node = this.find(value, this.root)
    if (!node) return null
    if (node.left && node.right) {
      const result = this.findMin(node.right)
      this.delete(result.value)
      node.value = result.value
    } else {
      this.replaceNodeInParent(node, node.left || node.right)
      this.size--
    }
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
    function* inorder(root: TreeNode<T>): Generator {
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

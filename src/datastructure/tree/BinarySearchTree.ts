import { SearchTree } from '../ADT'
import { Comparator, compareFunction } from '../../util'

export class TreeNodeBisic<T> {
  value: T
  parent: TreeNodeBisic<T> | null = null
  left: TreeNodeBisic<T> | null = null
  right: TreeNodeBisic<T> | null = null
  constructor(value: T, parent?: TreeNodeBisic<T>) {
    this.value = value
    if (parent != null) this.parent = parent
  }
}

export type TreeNode<T> = TreeNodeBisic<T> | null

class BinarySearchTree<T> implements SearchTree<T> {
  private root: TreeNode<T> = null
  protected cmp: Comparator<T>
  size: number = 0
  constructor(cmpFn?: compareFunction<T>) {
    this.cmp = new Comparator(cmpFn)
  }

  isEmpty() {
    return this.size === 0
  }

  private find(value: T, curRoot: TreeNode<T>): TreeNode<T> {
    if (curRoot === null) return null
    if (curRoot.value === value) return curRoot
    const child = this.cmp.lt(value, curRoot.value) ? 'left' : 'right'
    return curRoot[child] != null ? this.find(value, curRoot[child]) : null
  }

  private findMin(node: TreeNodeBisic<T>) {
    let minNode = node
    while (minNode?.left != null) {
      minNode = minNode.left
    }
    return minNode
  }

  private replaceNodeInParent(curNode: TreeNode<T>, newNode: TreeNode<T>) {
    const parent = curNode?.parent
    if (parent != null) {
      parent[curNode === parent.left ? 'left' : 'right'] = newNode
      if (newNode != null) newNode.parent = parent
    } else {
      this.root = newNode
    }
  }

  insert(value: T, parent?: TreeNode<T>) {
    if (parent == null) {
      if (this.root == null) {
        this.root = new TreeNodeBisic(value)
        this.size++
        return this
      }
      parent = this.root
    }
    const child = this.cmp.lt(value, parent.value) ? 'left' : 'right'
    if (parent[child] != null) {
      this.insert(value, parent[child])
    } else {
      parent[child] = new TreeNodeBisic(value, parent)
      this.size++
    }
    return this
  }

  delete(value: T) {
    const node = this.find(value, this.root)
    if (node == null) return null
    const temp = node.value
    if (node.left != null && node.right != null) {
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
    return node != null ? node.value : null
  }

  clear() {
    this.root = null
    this.size = 0
  }

  *traverse() {
    function* inorder(root: TreeNode<T>): Generator {
      if (root != null) {
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

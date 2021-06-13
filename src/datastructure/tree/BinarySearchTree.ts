import { SearchTree } from '../ADT'
import { TreeNode } from '../Node'
import { Comparator, compareFunction } from '../../util'

class BinarySearchTree<T> implements SearchTree<T> {
  root: TreeNode<T> | null = null
  protected cmp: Comparator<T>
  size: number = 0
  constructor(cmpFn?: compareFunction<T>) {
    this.cmp = new Comparator(cmpFn)
  }

  get isEmpty() {
    return this.size === 0
  }

  private searchNode(value: T, curRoot: TreeNode<T> | null): TreeNode<T> | null {
    if (curRoot === null) return null
    if (curRoot.value === value) return curRoot
    const child = this.cmp.lt(value, curRoot.value) ? 'left' : 'right'
    return curRoot[child] ? this.searchNode(value, curRoot[child]) : null
  }

  protected searchMinNode(node: TreeNode<T>) {
    let minNode = node
    while (minNode?.left) {
      minNode = minNode.left
    }
    return minNode
  }

  get min() {
    if (this.root === null) {
      return null
    } else {
      return this.searchMinNode(this.root).value
    }
  }

  protected searchMaxNode(node: TreeNode<T>) {
    let maxNode = node
    while (maxNode?.right) {
      maxNode = maxNode.right
    }
    return maxNode
  }

  get max() {
    if (this.root === null) {
      return null
    } else {
      return this.searchMaxNode(this.root).value
    }
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
    const node = this.searchNode(value, this.root)
    if (node == null) return null
    const temp = node.value
    if (node.left && node.right) {
      const result = this.searchMinNode(node.right)
      this.delete(result.value)
      node.value = result.value
    } else {
      this.replaceNodeInParent(node, node.left ?? node.right)
      this.size--
    }
    return temp
  }

  search(value: T) {
    const node = this.searchNode(value, this.root)
    return node ? node.value : null
  }

  protected getNodeSize(node: TreeNode<T> | null): number {
    if (node === null) {
      return 0
    } else if (node.isLeaf) {
      return 1
    } else {
      if (node.left === null) {
        return this.getNodeSize(node.right) + 1
      }
      if (node.right === null) {
        return this.getNodeSize(node.left) + 1
      }

      return this.getNodeSize(node.right) + this.getNodeSize(node.left) + 1
    }
  }

  protected getKthNode(index: number, node: TreeNode<T> | null): TreeNode<T> | null {
    if (node === null) {
      return null
    }
    const leftSize = this.getNodeSize(node.left)
    if (leftSize > index) {
      return this.getKthNode(index, node.left)
    } else if (leftSize < index) {
      return this.getKthNode(index - leftSize - 1, node.right)
    } else {
      return node
    }
  }

  getKth(index: number) {
    const result = this.getKthNode(index, this.root)
    if (result === null) {
      return null
    } else {
      return result.value
    }
  }

  protected getNodeRank(tree: TreeNode<T> | null, value: T): number {
    if (tree == null) return 0
    return this.cmp.lt(value, tree.value)
      ? this.getNodeRank(tree.left, value)
      : this.getNodeRank(tree.right, value) + this.getNodeSize(tree.left) + 1
  }

  getRank(value: T): number {
    return this.getNodeRank(this.root, value)
  }

  getPrev(value: T) {
    return this.getKth(this.getRank(value) - 1)
  }

  getNext(value: T) {
    return this.getKth(this.getRank(value) + 1)
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

import { TreapADT } from '../ADT'
import { Comparator, Pair, compareFunction } from '../../util'
class TreapNodeBasic<T> {
  value: T
  left: TreapNodeBasic<T> | null = null
  right: TreapNodeBasic<T> | null = null
  size: number = 1
  key: number
  constructor(value: T) {
    this.value = value
    this.key = Math.random()
  }

  resize() {
    this.size = 1 + (this.left ? this.left.size : 0) + (this.right ? this.right.size : 0)
  }
}

type TreapNode<T> = TreapNodeBasic<T> | null
class Treap<T> implements TreapADT<T> {
  protected cmp: Comparator<T>
  root: TreapNode<T> = null
  constructor(cmpFn?: compareFunction<T>) {
    this.cmp = new Comparator(cmpFn)
  }

  get size() {
    return this.root ? this.root.size : 0
  }

  isEmpty() {
    return this.size === 0
  }

  private getNodeSize(treap: TreapNode<T>) {
    return treap ? treap.size : 0
  }

  merge(treapA: TreapNode<T>, treapB: TreapNode<T>) {
    if (!treapA) return treapB
    if (!treapB) return treapA
    if (treapA.key < treapB.key) {
      treapA.right = this.merge(treapA.right, treapB)
      treapA.resize()
      return treapA
    } else {
      treapB.left = this.merge(treapA, treapB.left)
      treapB.resize()
      return treapB
    }
  }

  split(treap: TreapNode<T>, k: number) {
    let result: Pair<TreapNode<T>, TreapNode<T>> = new Pair()
    if (!treap) return result
    if (this.getNodeSize(treap.left) < k) {
      result = this.split(treap.right, k - this.getNodeSize(treap.left) - 1)
      treap.right = result.first
      treap.resize()
      result.first = treap
    } else {
      result = this.split(treap.left, k)
      treap.left = result.second
      treap.resize()
      result.second = treap
    }
    return result
  }

  splitV(treap: TreapNode<T>, value: T) {
    let result: Pair<TreapNode<T>, TreapNode<T>> = new Pair()
    if (!treap) return result
    if (this.cmp.lt(treap.value, value)) {
      result = this.splitV(treap.right, value)
      treap.right = result.first
      treap.resize()
      result.first = treap
    } else {
      result = this.splitV(treap.left, value)
      treap.left = result.second
      treap.resize()
      result.second = treap
    }
    return result
  }

  getNodeRank(treap: TreapNode<T>, value: T): number {
    if (!treap) return 0
    return this.cmp.lt(value, treap.value)
      ? this.getNodeRank(treap.left, value)
      : this.getNodeRank(treap.right, value) + this.getNodeSize(treap.left) + 1
  }

  getRank(value: T): number {
    return this.getNodeRank(this.root, value)
  }

  getNodeKth(treap: TreapNode<T>, k: number) {
    if (!treap) return null
    const sp1 = this.split(treap, k - 1)
    const sp2 = this.split(sp1.second, 1)
    const result = sp2.first
    this.merge(sp1.first, this.merge(sp2.first, sp2.second))
    return result ? result.value : null
  }

  getKth(index: number) {
    return this.getNodeKth(this.root, index)
  }

  insert(value: T) {
    const k = this.getRank(value)
    const sp = this.split(this.root, k)
    const node = new TreapNodeBasic(value)
    this.root = this.merge(this.merge(sp.first, node), sp.second)
    return this
  }

  delete(value: T) {
    return this.deleteKth(this.getRank(value))
  }

  deleteKth(k: number) {
    const firstToKth = this.split(this.root, k - 1)
    const kthToLast = this.split(firstToKth.second, 1)
    this.root = this.merge(firstToKth.first, kthToLast.second)
    return kthToLast.first ? kthToLast.first.value : null
  }

  peek() {
    if (!this.root) return null
    return this.root.value
  }

  extract() {
    if (!this.root) return null
    return this.deleteKth(this.getRank(this.root.value))
  }

  getPre(value: T) {
    return this.getKth(this.getRank(value) - 1)
  }

  getNext(value: T) {
    return this.getKth(this.getRank(value) + 1)
  }

  /**
   * anothor way to traverse
   * ```
  traverse() {
    for (let i = 0; i < this.size; i++) {
      yield this.getKth(i + 1)
    }
  }
   * ```
   */

  *traverse() {
    function* inorder(root: TreapNode<T>): Generator {
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

export default Treap

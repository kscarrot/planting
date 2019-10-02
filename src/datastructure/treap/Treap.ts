import comparator, { CompareFunction } from '../../util/comparator'

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

class Treap<T> {
  protected cmp: comparator<T>
  root: TreapNode<T> = null
  constructor(cmpFn?: CompareFunction<T>) {
    this.cmp = new comparator(cmpFn)
  }

  get size() {
    return this.root ? this.root.size : 0
  }

  isEmpty() {
    return this.size === 0
  }

  getNodeSize(treap: TreapNode<T>) {
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
    let result: TreapNode<T>[] = [null, null]
    if (!treap) return result
    if (this.getNodeSize(treap.left) >= k) {
      result = this.split(treap.left, k)
      treap.left = result[1]
      treap.resize()
      result[1] = treap
    } else {
      result = this.split(treap.right, k - this.getNodeSize(treap.left) - 1)
      treap.right = result[0]
      treap.resize()
      result[0] = treap
    }
    return result
  }

  getRank(treap: TreapNode<T>, value: T): number {
    if (!treap) return 0
    return this.cmp.lt(value, treap.value)
      ? this.getRank(treap.left, value)
      : this.getRank(treap.right, value) + this.getNodeSize(treap.left) + 1
  }

  getKth(treap: TreapNode<T>, k: number) {
    if (!treap) return null
    const sp1 = this.split(treap, k - 1)
    const sp2 = this.split(sp1[1], 1)
    const result = sp2[0]
    this.merge(sp1[0], this.merge(sp2[0], sp2[1]))
    return result ? result.value : null
  }

  insert(value: T) {
    const k = this.getRank(this.root, value)
    const sp = this.split(this.root, k)
    const node = new TreapNodeBasic(value)
    this.root = this.merge(this.merge(sp[0], node), sp[1])
    return this
  }

  delete(k: number) {
    const rootToKth = this.split(this.root, k - 1)
    const kthToTial = this.split(rootToKth[1], 1)
    this.root = this.merge(rootToKth[0], kthToTial[1])
    return kthToTial[0] ? kthToTial[0].value : null
  }

  getPre(value: T) {
    return this.getKth(this.root, this.getRank(this.root, value) - 1)
  }

  getNext(value: T) {
    return this.getKth(this.root, this.getRank(this.root, value) + 1)
  }

  splitV(treap: TreapNode<T>, value: T) {
    let result: TreapNode<T>[] = [null, null]
    if (!treap) return result
    if (this.cmp.lt(treap.value, value)) {
      result = this.splitV(treap.right, value)
      treap.right = result[0]
      treap.resize()
      result[0] = treap
    } else {
      result = this.splitV(treap.left, value)
      treap.left = result[1]
      treap.resize()
      result[1] = treap
    }
    return result
  }

  *traverse() {
    for (let i = 0; i < this.size; i++) {
      yield this.getKth(this.root, i + 1)
    }
  }

  [Symbol.iterator] = this.traverse
}

export default Treap

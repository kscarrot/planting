import { TreapADT } from '../ADT'
import { TreapNode } from '../Node'
import { Pair } from '../../util'
import BinarySearchTree from './BinarySearchTree'
class Treap<T> extends BinarySearchTree<T> implements TreapADT<T> {
  override root: TreapNode<T> | null = null

  protected override getNodeSize(treap: TreapNode<T> | null) {
    return treap?.size ?? 0
  }

  merge(treapA: TreapNode<T> | null, treapB: TreapNode<T> | null) {
    if (treapA == null) return treapB
    if (treapB == null) return treapA
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

  split(treap: TreapNode<T> | null, k: number) {
    let result: Pair<TreapNode<T> | null, TreapNode<T> | null> = new Pair()
    if (treap == null) return result
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

  splitV(treap: TreapNode<T> | null, value: T) {
    let result: Pair<TreapNode<T> | null, TreapNode<T> | null> = new Pair()
    if (treap == null) return result
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

  getNodeKth(treap: TreapNode<T> | null, k: number) {
    if (treap == null) return null
    const sp1 = this.split(treap, k - 1)
    const sp2 = this.split(sp1.second, 1)
    const result = sp2.first
    this.merge(sp1.first, this.merge(sp2.first, sp2.second))
    return result
  }

  override getKth(index: number) {
    const kthNode = this.getNodeKth(this.root, index)
    if (kthNode === null) return null
    return kthNode.value
  }

  override insert(value: T) {
    const k = this.getRank(value)
    const sp = this.split(this.root, k)
    const node = new TreapNode(value)
    this.root = this.merge(this.merge(sp.first, node), sp.second)
    this.size = this.root?.size ?? 0
    return this
  }

  override delete(value: T) {
    return this.deleteKth(this.getRank(value))
  }

  deleteKth(k: number) {
    const firstToKth = this.split(this.root, k - 1)
    const kthToLast = this.split(firstToKth.second, 1)
    this.root = this.merge(firstToKth.first, kthToLast.second)
    this.size = this.root?.size ?? 0
    return kthToLast.first?.value ?? null
  }

  peek() {
    if (this.root == null) return null
    return this.root.value
  }

  extract() {
    if (this.root == null) return null
    return this.deleteKth(this.getRank(this.root.value))
  }
}

export default Treap

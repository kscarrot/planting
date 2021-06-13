import { TreapADT } from '../ADT'
import { TreapRotateNode } from '../Node'
import BinarySearchTree from './BinarySearchTree'

const inverse = (side: 'right' | 'left') => (side === 'right' ? 'left' : 'right')

class TreapRotate<T> extends BinarySearchTree<T> implements TreapADT<T> {
  override root: TreapRotateNode<T> | null = null

  private insertNode(node: TreapRotateNode<T> | null, value: T) {
    if (node === null) {
      this.size++
      return new TreapRotateNode(value)
    }
    const side = this.cmp.lt(value, node.value) ? 'left' : 'right'
    node[side] = this.insertNode(node[side], value)
    // Keep it balance
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (node[side]!.key < node.key) {
      return node.rotate(side)
    }
    return node.resize()
  }

  private findNode(node: TreapRotateNode<T> | null, value: T): TreapRotateNode<T> | null {
    if (node === null) return null
    if (node.value === value) return node
    const side = this.cmp.lt(value, node.value) ? 'left' : 'right'
    return this.findNode(node[side], value)
  }

  private deleteNode(node: TreapRotateNode<T> | null, value: T) {
    if (node === null) return null

    if (node.value === value) {
      if (node.isLeaf) {
        this.size--
        return null
      }
      const side = node.left === null ? 'right' : 'left'
      const inverseSide = inverse(side)
      node = node.rotate(side) as TreapRotateNode<T>
      node[inverseSide] = this.deleteNode(node[inverseSide], value)
      return node.resize()
    } else {
      const side = this.cmp.lt(value, node.value) ? 'left' : 'right'
      node[side] = this.deleteNode(node[side], value)
      return node.resize()
    }
  }

  override insert(value: T) {
    this.root = this.insertNode(this.root, value)
    return this
  }

  find(value: T) {
    const result = this.findNode(this.root, value)
    return result?.value ?? null
  }

  override delete(value: T) {
    this.root = this.deleteNode(this.root, value)
    return value
  }

  peek() {
    if (this.root == null) return null
    return this.root.value
  }

  extract() {
    const value = this.peek()
    if (value) {
      return this.delete(value)
    }
    return null
  }
}

export default TreapRotate

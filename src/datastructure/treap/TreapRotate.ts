import { TreapADT } from '../ADT'
import { comparator, CompareFunction } from '../../util'

type TreapRotateNode<T> = TreapRotateBasicNode<T> | null

const inverse = (side: 'right' | 'left') => (side === 'right' ? 'left' : 'right')

class TreapRotateBasicNode<T> {
  value: T
  left: TreapRotateNode<T>
  right: TreapRotateNode<T>
  size: number = 1
  key: number
  constructor(value: T, left?: TreapRotateNode<T>, right?: TreapRotateNode<T>) {
    this.value = value
    this.left = left || null
    this.right = right || null
    this.key = Math.random()
  }

  resize() {
    this.size = (this.right ? this.right.size : 0) + (this.left ? this.left.size : 0) + 1
    return this
  }

  /**
   *
   * @param side 旋转的方向
   *       y                       x
   *     /   \                   /   \
   *    x     c      <=>        a      y
   *  /   \                          /   \
   * a     b                        b     c
   */
  rotate(side: 'right' | 'left') {
    const temp = this[side]
    const inverseSide = inverse(side)
    if (temp) {
      this[side] = temp[inverseSide]
      temp[inverseSide] = this
      this.resize()
      temp.resize()
    }
    return temp
  }
}

class TreapRotate<T> implements TreapADT<T> {
  protected cmp: comparator<T>
  root: TreapRotateNode<T> = null
  constructor(cmpFn?: CompareFunction<T>) {
    this.cmp = new comparator(cmpFn)
  }
  get size() {
    return this.root ? this.root.size : 0
  }

  isEmpty() {
    return this.size === 0
  }

  private insertNode(node: TreapRotateNode<T>, value: T) {
    if (node === null) {
      return new TreapRotateBasicNode(value)
    }
    const side = this.cmp.lt(value, node.value) ? 'left' : 'right'
    node[side] = this.insertNode(node[side], value)
    // Keep it balance
    if (node[side]!.key < node.key) {
      return node.rotate(side)
    }
    return node.resize()
  }

  private findNode(node: TreapRotateNode<T>, value: T): TreapRotateNode<T> {
    if (node === null) return null
    if (node.value === value) return node
    const side = this.cmp.lt(value, node.value) ? 'left' : 'right'
    return this.findNode(node[side], value)
  }

  private deleteNode(node: TreapRotateNode<T>, value: T) {
    if (node === null) return null

    if (node.value === value) {
      if (node.left === null && node.right === null) {
        return null
      }
      const side = node.left === null ? 'right' : 'left'
      const inverseSide = inverse(side)
      node = <TreapRotateBasicNode<T>>node.rotate(side)
      //at least one child not null
      node[inverseSide] = this.deleteNode(node[inverseSide], value)
      return node.resize()
    } else {
      const side = this.cmp.lt(value, node.value) ? 'left' : 'right'
      node[side] = this.deleteNode(node[side], value)
      return node.resize()
    }
  }

  insert(value: T) {
    this.root = this.insertNode(this.root, value)
    return this
  }

  find(value: T) {
    const result = this.findNode(this.root, value)
    return result ? result.value : null
  }

  delete(value: T) {
    this.root = this.deleteNode(this.root, value)
    return value
  }

  peek() {
    if (!this.root) return null
    return this.root.value
  }

  extract() {
    const value = this.peek()
    if (value) {
      return this.delete(value)
    }
    return null
  }

  *traverse() {
    function* inorder(root: TreapRotateNode<T>): Generator {
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

export default TreapRotate

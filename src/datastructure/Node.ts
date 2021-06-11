export class BaseNode<T> {
  public value: T
  constructor(value: T) {
    this.value = value
  }
}

export class SinglyLinkedNode<T> extends BaseNode<T> {
  public next: SinglyLinkedNode<T> | null
  constructor(value: T) {
    super(value)
    this.next = null
  }
}

export class DoublyLinkedNode<T> extends SinglyLinkedNode<T> {
  public prev: DoublyLinkedNode<T> | null
  public next: DoublyLinkedNode<T> | null
  constructor(value: T) {
    super(value)
    this.next = null
    this.prev = null
  }
}

export class CircularLinkedNode<T> extends DoublyLinkedNode<T> {
  public prev: CircularLinkedNode<T>
  public next: CircularLinkedNode<T>
  constructor(value: T, prev?: CircularLinkedNode<T>, next?: CircularLinkedNode<T>) {
    super(value)
    this.prev = prev ?? this
    this.next = next ?? this
  }
}

export class TreeNode<T> {
  value: T
  parent: TreeNode<T> | null = null
  left: TreeNode<T> | null = null
  right: TreeNode<T> | null = null
  constructor(value: T, parent?: TreeNode<T>) {
    this.value = value
    if (parent) this.parent = parent
  }
}

export class TreapNode<T> extends TreeNode<T> {
  left: TreapNode<T> | null = null
  right: TreapNode<T> | null = null
  size: number = 1
  key: number
  constructor(value: T) {
    super(value)
    this.key = Math.random()
  }

  resize() {
    this.size = 1 + (this.left ? this.left.size : 0) + (this.right ? this.right.size : 0)
    return this
  }
}

const inverse = (side: 'right' | 'left') => (side === 'right' ? 'left' : 'right')

export class TreapRotateNode<T> extends TreapNode<T> {
  left: TreapRotateNode<T> | null
  right: TreapRotateNode<T> | null
  size: number = 1
  key: number
  constructor(value: T, left?: TreapRotateNode<T>, right?: TreapRotateNode<T>) {
    super(value)
    this.left = left ?? null
    this.right = right ?? null
    this.key = Math.random()
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

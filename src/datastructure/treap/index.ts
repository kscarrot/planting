import Treap from './Treap'

export class TreapNodeBasic<T> {
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

export type TreapNode<T> = TreapNodeBasic<T> | null

export { Treap }

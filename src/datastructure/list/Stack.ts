import { StackADT } from '@ds/ADT'
import List from './index'

class Stack<T> implements StackADT<T> {
  private l: List<T>
  constructor() {
    this.l = new List<T>()
  }

  get length() {
    return this.l.length
  }

  get isEmpty() {
    return this.l.isEmpty
  }

  push(value: T) {
    this.l.add(value)
  }

  pop() {
    if (this.l.tail) {
      return this.l.deleteNode(this.l.tail)
    } else {
      throw new Error('Stack is empty')
    }
  }

  peek() {
    if (this.l.tail) {
      return this.l.tail.value
    } else {
      throw new Error('Stack is empty')
    }
  }

  [Symbol.iterator] = this.l.traverse
}

export default Stack

import { StackADT } from '../ADT'
import { DoublyLinkedList as List } from '../list'

class Stack<T> implements StackADT<T> {
  private readonly l: List<T>
  constructor() {
    this.l = new List<T>()
  }

  get length() {
    return this.l.length
  }

  get isEmpty() {
    return this.l.isEmpty
  }

  private traverse() {
    return this.l.traverse()
  }

  push(value: T) {
    this.l.add(value)
  }

  pop() {
    if (this.l.tail != null) {
      return this.l.deleteNode(this.l.tail)
    } else {
      throw new Error('Stack is empty')
    }
  }

  peek() {
    if (this.l.tail != null) {
      return this.l.tail.value
    } else {
      throw new Error('Stack is empty')
    }
  }

  [Symbol.iterator] = this.traverse
}

export default Stack

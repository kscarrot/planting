import { DequeueADT } from '@ds/ADT'
import List from '@ds/list'

class Dequeue<T> implements DequeueADT<T> {
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

  private traverse() {
    return this.l.traverse()
  }

  push(value: T) {
    this.l.add(value)
  }

  pop() {
    if (this.l.tail) {
      return this.l.deleteNode(this.l.tail)
    }
    throw new Error('Dequeue is empty')
  }

  shift() {
    if (this.l.isEmpty()) {
      throw new Error('Dequeue is empty')
    }
    return this.l.delete(0)
  }

  unshift(value: T) {
    this.l.insert(0, value)
  }

  front() {
    if (this.l.head) {
      return this.l.head.value
    } else {
      throw new Error('Dequeue is empty')
    }
  }

  end() {
    if (this.l.tail) {
      return this.l.tail.value
    } else {
      throw new Error('Dequeue is empty')
    }
  }

  [Symbol.iterator] = this.traverse
}

export default Dequeue

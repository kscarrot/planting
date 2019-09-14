import { QueueADT } from '@ds/ADT'
import List from '@ds/list/index'

class Queue<T> implements QueueADT<T> {
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

  enqueue(value: T) {
    this.l.add(value)
  }

  dequeue() {
    if (this.l.isEmpty()) {
      throw new Error('Queue is empty')
    }
    return this.l.delete(0)
  }

  front() {
    if (this.l.head) {
      return this.l.head.value
    } else {
      throw new Error('Queue is empty')
    }
  }

  end() {
    if (this.l.tail) {
      return this.l.tail.value
    } else {
      throw new Error('Queue is empty')
    }
  }

  [Symbol.iterator] = this.traverse
}

export default Queue

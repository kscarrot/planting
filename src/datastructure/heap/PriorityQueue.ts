import { MaxHeap } from './Heap'
import { PriorityQueueADT } from '../ADT'

class PriorityQueue<T> implements PriorityQueueADT<T> {
  private readonly priorityMap: Map<T, number>
  private readonly heap: MaxHeap<T>
  constructor() {
    this.priorityMap = new Map()
    const comparePriority = (a: T, b: T) => {
      const ap = this.priorityMap.get(a) as number
      const bp = this.priorityMap.get(b) as number
      return ap < bp ? -1 : 1
    }
    this.heap = new MaxHeap(comparePriority)
  }

  get length() {
    return this.heap.size
  }

  isEmpty() {
    return this.length === 0
  }

  priority(value: T) {
    const result = this.priorityMap.get(value)
    return result ?? null
  }

  changePriority(value: T, priority: number) {
    this.priorityMap.set(value, priority)
    this.heap.heapify()
  }

  enqueue(value: T, priority: number = 1) {
    if (this.priorityMap.has(value)) {
      return this.changePriority(value, priority)
    }
    this.priorityMap.set(value, priority)
    this.heap.insert(value)
  }

  dequeue() {
    const top = this.heap.extract()
    if (top) {
      this.priorityMap.delete(top)
    } else {
      throw new Error('queue is empty')
    }
    return top
  }

  front() {
    const top = this.heap.peek()
    if (top) {
      return top
    } else {
      throw new Error('queue is empty')
    }
  }

  *traverse() {
    for (const iterator of this.heap) {
      yield iterator
    }
  }

  [Symbol.iterator] = this.traverse
}

export default PriorityQueue

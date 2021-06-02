import { HeapADT } from '../ADT'
import { Comparator, compareFunction } from '../../util'

class MinHeap<T> implements HeapADT<T> {
  private heap: T[] = []
  protected cmp: Comparator<T>
  constructor(cmpFn?: compareFunction<T>) {
    this.cmp = new Comparator(cmpFn)
  }

  get size() {
    return this.heap.length
  }

  isEmpty() {
    return this.heap.length === 0
  }

  private getParentIndex(childIndex: number) {
    return (childIndex - 1) >> 1
  }

  private getLeftChildIndex(parentIndex: number) {
    return parentIndex * 2 + 1
  }

  private getRigthChildIndex(parentIndex: number) {
    return parentIndex * 2 + 2
  }

  private hasParent(childIndex: number) {
    return this.getParentIndex(childIndex) >= 0
  }

  private hasLeftChild(parentIndex: number) {
    return this.getLeftChildIndex(parentIndex) < this.size
  }

  private hasRightChild(parentIndex: number) {
    return this.getRigthChildIndex(parentIndex) < this.size
  }

  private swap(a: number, b: number) {
    ;[this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
  }

  private shiftUp(index?: number) {
    let i = index ?? this.size - 1
    while (this.hasParent(i) && this.cmp.gt(this.heap[this.getParentIndex(i)], this.heap[i])) {
      const parentIndex = this.getParentIndex(i)
      this.swap(i, parentIndex)
      i = parentIndex
    }
  }

  private shiftDown(index: number = 0) {
    let i = index
    let nextIndex
    while (this.hasLeftChild(i)) {
      const left = this.getLeftChildIndex(i)
      if (this.hasRightChild(i)) {
        const right = this.getRigthChildIndex(i)
        nextIndex = this.cmp.gt(this.heap[left], this.heap[right]) ? right : left
      } else {
        nextIndex = left
      }
      if (this.cmp.gt(this.heap[nextIndex], this.heap[i])) {
        break
      }
      this.swap(i, nextIndex)
      i = nextIndex
    }
  }

  peek() {
    if (this.isEmpty()) {
      return null
    }
    return this.heap[0]
  }

  insert(value: T) {
    this.heap.push(value)
    this.shiftUp()
    return this
  }

  extract() {
    if (this.isEmpty()) {
      return null
    }
    if (this.size === 1) {
      return this.heap.pop() as T
    }
    const min = this.heap[0]
    this.heap[0] = this.heap.pop() as T
    this.shiftDown()
    return min
  }

  heapify(array?: T[]) {
    if (array != null) {
      this.heap = array
    }
    for (let i = this.size >> 1; i >= 0; i--) {
      this.shiftDown(i)
    }
    return this
  }

  *traverse() {
    let index = 0
    while (index < this.size) {
      yield this.heap[index]
      index++
    }
  }

  [Symbol.iterator] = this.traverse
}

class MaxHeap<T> extends MinHeap<T> {
  constructor(cmpFn?: compareFunction<T>) {
    super(cmpFn)
    this.cmp.reverse()
  }

  [Symbol.iterator] = super.traverse
}

export { MinHeap, MaxHeap }

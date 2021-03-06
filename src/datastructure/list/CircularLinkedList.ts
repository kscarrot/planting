import { ListADT } from '../ADT'
import { CircularLinkedNode } from '../Node'

class CircularLinkedList<T> implements ListADT<T> {
  length = 0
  head: null | CircularLinkedNode<T> = null

  get isEmpty() {
    return this.length === 0
  }

  private isNodeNull(node: CircularLinkedNode<T> | null): node is null {
    return node === null
  }

  private getNode(index: number) {
    let point = this.head
    if (this.isNodeNull(point)) {
      throw new Error('List is Empty')
    }
    if (index > 0) {
      for (let i = 0; i < index; i++) {
        point = point.next
      }
    } else if (index < 0) {
      for (let i = 0; i < -index; i++) {
        point = point.prev
      }
    }
    return point
  }

  get(index: number) {
    return this.getNode(index).value
  }

  add(value: T) {
    const node = new CircularLinkedNode(value)
    if (this.isNodeNull(this.head)) {
      this.head = node
    } else {
      const tail = this.head.prev
      tail.next = node
      node.prev = tail
      node.next = this.head
      this.head.prev = node
    }
    this.length++
    return this
  }

  private deleteNode(delNode: CircularLinkedNode<T>) {
    if (this.length === 1) {
      this.head = null
    } else {
      delNode.next.prev = delNode.prev
      delNode.prev.next = delNode.next
    }
    this.length--
    return delNode.value
  }

  delete(index: number) {
    return this.deleteNode(this.getNode(index))
  }

  insert(index: number, value: T) {
    if (this.isEmpty) {
      this.add(value)
      return this
    }
    const node = new CircularLinkedNode(value)
    const nextNode = this.getNode(index)
    const prevNode = nextNode.prev
    prevNode.next = node
    node.prev = prevNode
    nextNode.prev = node
    node.next = nextNode
    this.length++
    return this
  }

  *traverse() {
    let current = this.head
    let index = 0
    while (current && index < this.length) {
      yield current.value
      current = current.next
      index++
    }
  }

  [Symbol.iterator] = this.traverse
}

export default CircularLinkedList

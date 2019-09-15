import { ListADT } from '@ds/ADT'
import { Node } from './DoublyLinkedLIst'

class CircularLinkedList<T> implements ListADT<T> {
  length = 0
  head: null | Node<T> = null

  isEmpty() {
    return this.length === 0
  }

  getNode(index: number) {
    if (this.isEmpty()) {
      throw new Error('List is Empty')
    }
    let point = this.head
    if (index > 0) {
      for (let i = 0; i < index; i++) {
        point = point!.next
      }
    } else if (index < 0) {
      for (let i = 0; i < -index; i++) {
        point = point!.prev
      }
    }
    return point as Node<T>
  }

  get(index: number) {
    return this.getNode(index).value
  }

  add(value: T) {
    const node = new Node(value)
    if (this.isEmpty()) {
      this.head = node
      node.next = node
      node.prev = node
    } else {
      const tail = this.head!.prev
      tail!.next = node
      node.prev = tail
      node.next = this.head
      this.head!.prev = node
    }
    this.length++
  }

  deleteNode(delNode: Node<T>) {
    if (this.length === 1) {
      this.head = null
    } else {
      delNode.next!.prev = delNode.prev
      delNode.prev!.next = delNode.next
    }
    this.length--
    return delNode.value
  }

  delete(index: number) {
    return this.deleteNode(this.getNode(index))
  }

  insert(index: number, value: T) {
    if (this.isEmpty()) {
      this.add(value)
      return
    }
    const node = new Node(value)
    const prevNode = this.getNode(index - 1)
    prevNode!.next = node
    node.prev = prevNode
    const nextNode = this.getNode(index)
    nextNode.prev = node
    node.next = nextNode
    this.length++
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

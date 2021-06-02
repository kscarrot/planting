import { ListADT } from '../ADT'

export class Node<T> {
  value: T
  prev: Node<T> | null = null // 作为head时为null
  next: Node<T> | null = null // 作为tail时为null
  constructor(value: T) {
    this.value = value
  }
}

class DoublyLinkedList<T> implements ListADT<T> {
  length = 0
  head: null | Node<T> = null
  tail: null | Node<T> = null

  isEmpty() {
    return this.length === 0
  }

  getNode(index: number) {
    if (this.head === null) {
      throw new Error('List is Empty')
    }
    if (index >= this.length || index < 0) {
      throw new Error('Index out of bounds')
    }
    let point = this.head
    for (let i = 0; i < index; i++) {
      point = point.next as Node<T>
    }
    return point
  }

  get(index: number) {
    return this.getNode(index).value
  }

  add(value: T) {
    const node = new Node(value)
    if (this.tail === null) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    }
    this.length++
  }

  deleteNode(delNode: Node<T>) {
    if (delNode === this.tail) {
      this.tail = delNode.prev
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      delNode.next!.prev = delNode.prev
    }
    if (delNode === this.head) {
      this.head = delNode.next
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      delNode.prev!.next = delNode.next
    }
    this.length--
    return delNode.value
  }

  delete(index: number) {
    return this.deleteNode(this.getNode(index))
  }

  insert(index: number, value: T) {
    if (index === this.length) {
      this.add(value)
      return this
    }
    const node = new Node(value)
    const nextNode = this.getNode(index)
    const prevNode = nextNode.prev
    if (prevNode === null) {
      node.next = nextNode
      nextNode.prev = node
      this.head = node
    } else {
      prevNode.next = node
      node.prev = prevNode
      nextNode.prev = node
      node.next = nextNode
    }
    this.length++
    return this
  }

  *traverse() {
    let current = this.head
    while (current != null) {
      yield current.value
      current = current.next
    }
  }

  [Symbol.iterator] = this.traverse
}

export default DoublyLinkedList

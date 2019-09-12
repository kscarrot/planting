import { ListADT } from '@ds/ADT'

class Node<T> {
  value: T
  prev: Node<T> | null = null
  next: Node<T> | null = null
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
    if (this.isEmpty()) {
      throw new Error('List is Empty')
    }
    if (index > this.length || index < 0) {
      throw new Error('Index out of bounds')
    }
    let point = this.head
    for (let i = 0; i < index; i++) {
      point = (point as Node<T>).next
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
      this.tail = node
    } else {
      ;(this.tail as Node<T>).next = node
      node.prev = this.tail
      this.tail = node
    }
    this.length++
  }

  delete(index: number) {
    const delNode = this.getNode(index)
    if (delNode === this.tail) {
      this.tail = delNode.prev
    } else {
      ;(delNode.next as Node<T>).prev = delNode.prev
    }
    if (delNode === this.head) {
      this.head = delNode.next
    } else {
      ;(delNode.prev as Node<T>).next = delNode.next
    }
    this.length--
    return delNode.value
  }

  insert(index: number, value: T) {
    const node = new Node(value)
    if (index === 0) {
      if (this.head) {
        this.head.prev = node
        node.next = this.head
      }
      this.head = node
    }

    if (index === this.length) {
      if (this.tail) {
        this.tail.next = node
        node.prev = this.tail
      }
      this.tail = node
    }

    if (index !== 0 && index !== this.length) {
      const nextNode = this.getNode(index)
      const prevNode = nextNode.prev
      ;(prevNode as Node<T>).next = node
      node.prev = prevNode
      nextNode.prev = node
      node.next = nextNode
    }
    this.length++
  }

  *traverse() {
    let current = this.head
    while (current) {
      yield current.value
      current = current.next
    }
  }

  [Symbol.iterator] = this.traverse
}

export default DoublyLinkedList

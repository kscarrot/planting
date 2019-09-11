import { ListADT } from '../ADT'

class Node<T> {
  value: T
  next: Node<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}

class LinkedList<T> implements ListADT<T> {
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
    index = Math.floor(index)
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
      if (this.tail !== null) {
        this.tail.next = node
        this.tail = node
      }
    }
    this.length++
  }

  delete(index: number) {
    const delNode = this.getNode(index)
    if (index === 0) {
      this.head = delNode.next
    }
    if (index === this.length - 1) {
      if (index === 0) {
        this.tail = null
      } else {
        const preNode = this.getNode(index - 1)
        this.tail = preNode
        this.tail.next = null
      }
    }
    if (index !== 0 && index !== this.length - 1) {
      const prevNode = this.getNode(index - 1)
      prevNode.next = delNode.next
    }
    delNode.next = null
    this.length--
    return delNode.value
  }

  insert(index: number, value: T) {
    const node = new Node(value)
    if (index === 0) {
      node.next = this.head
      this.head = node
    }

    if (index === this.length) {
      if (this.tail) {
        this.tail.next = node
      }
      this.tail = node
    }

    if (index !== 0 && index !== this.length) {
      const prevNode = this.getNode(index - 1)
      node.next = prevNode.next
      prevNode.next = node
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

export default LinkedList

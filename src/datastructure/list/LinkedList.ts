import { ListADT } from '@ds/ADT'

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

  private getNode(index: number) {
    if (this.isEmpty()) {
      throw new Error('List is Empty')
    }
    if (index > this.length || index < 0) {
      throw new Error('Index out of bounds')
    }
    let point = this.head
    for (let i = 0; i < index; i++) {
      point = point!.next
    }
    return <Node<T>>point
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
      this.tail!.next = node
      this.tail = node
    }
    this.length++
  }

  delete(index: number) {
    const delNode = this.getNode(index)
    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else if (delNode === this.head) {
      this.head = delNode.next
    } else if (delNode === this.tail) {
      const preNode = this.getNode(index - 1)
      this.tail = preNode
      preNode.next = null
    } else {
      const prevNode = this.getNode(index - 1)
      prevNode.next = delNode.next
    }
    delNode.next = null
    this.length--
    return delNode.value
  }

  insert(index: number, value: T) {
    const node = new Node(value)
    if (index === this.length) {
      this.add(value)
      return
    } else if (index === 0) {
      node.next = this.head
      this.head = node
    } else {
      const prevNode = this.getNode(index - 1)
      node.next = prevNode.next
      prevNode.next = node
    }
    this.length++
  }

  private *traverse() {
    let current = this.head
    while (current) {
      yield current.value
      current = current.next
    }
  }

  [Symbol.iterator] = this.traverse
}

export default LinkedList

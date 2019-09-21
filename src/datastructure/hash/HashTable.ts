import { HashTableADT } from '../ADT'
import { DoublyLinkedList as List } from '../list'

type Map<T> = {
  key: any
  value: T
}

class HashTable<T> implements HashTableADT<T> {
  size: number = 0
  private table: List<Map<T>>[]
  constructor(initalCapacity: number = 64) {
    this.table = new Array(initalCapacity)
  }

  get capacity() {
    return this.table.length
  }

  hash(s: any) {
    if (typeof s !== 'string') {
      s = JSON.stringify(s)
    }
    let hash = 0
    for (let i = 0; i < s.length; i++) {
      hash = (hash << 5) - hash + s.charCodeAt(i)
      hash &= hash
    }
    return hash
  }

  private position(key: any) {
    return Math.abs(this.hash(key)) % this.capacity
  }

  get(key: any) {
    const element = this.find(key)
    return element ? element.value : null
  }

  set(key: any, value: T) {
    const i = this.position(key)
    if (!this.table[i]) {
      this.table[i] = new List()
    }
    const item = { key, value }
    let element = this.find(key)
    if (element) {
      element.value = value
    } else {
      this.table[i].add(item)
      this.size++
    }
  }

  delete(key: any) {
    const i = this.position(key)
    const node = this.findNode(this.table[i], key)
    if (node) {
      this.table[i].deleteNode(node)
      this.size--
      return true
    }
    return false
  }

  clear() {
    this.table = []
    this.size = 0
  }

  private findNode(list: List<Map<T>>, key: any) {
    let node = list && list.head
    while (node) {
      if (node.value.key === key) {
        return node
      }
      node = node.next
    }
  }

  private find(key: any) {
    const i = this.position(key)
    if (this.table[i]) {
      for (const map of this.table[i]) {
        if (map.key === key) {
          return map
        }
      }
    }
    return null
  }
}

export default HashTable

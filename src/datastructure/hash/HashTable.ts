import { HashTableADT } from '@ds/ADT'
import { DoublyLinkedList as List } from '@ds/list'

type Map<T> = {
  key: any
  value: T
}

class HashTable<T> implements HashTableADT<T> {
  size: number = 0
  private table: List<Map<T>>[]
  constructor(initalCapacity: number) {
    this.table = new Array(initalCapacity || 64)
  }

  get capacity() {
    return this.table.length
  }

  private hash(s: any) {
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
    let list = this.table[i]
    if (!list) {
      list = new List()
    }
    const item = { key, value }
    let element = this.find(key)
    if (element) {
      list.getNode(i).value = item
    } else {
      list.add(item)
      this.size++
    }
  }

  delete(key: any) {
    const i = this.position(key)
    let element = this.find(key)
    if (element) {
      this.table[i].delete(i)
      this.size--
    }
  }

  private find(key: any) {
    const i = this.position(key)
    for (const iterator of this.table[i]) {
      if (iterator.key === key) {
        return iterator
      }
    }
    return null
  }
}

export default HashTable

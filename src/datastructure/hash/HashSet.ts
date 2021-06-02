import { HashSetADT } from '../ADT'
import HashTable from './HashTable'

class HashSet<T> implements HashSetADT<T> {
  private readonly h: HashTable<boolean>
  constructor() {
    this.h = new HashTable<boolean>()
  }

  get size() {
    return this.h.size
  }

  add(value: T) {
    this.h.set(value, true)
    return this
  }

  delete(value: T) {
    return this.h.delete(value)
  }

  has(value: T) {
    return this.h.get(value) === true
  }

  clear() {
    this.h.clear()
  }
}

export default HashSet

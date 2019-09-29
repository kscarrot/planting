import { HashSetADT } from '../ADT'
import HashTable from './HashTable'

class HashSet implements HashSetADT {
  private h: HashTable<boolean>
  constructor() {
    this.h = new HashTable<boolean>()
  }

  get size() {
    return this.h.size
  }

  add(value: any) {
    this.h.set(value, true)
    return this
  }

  delete(value: any) {
    return this.h.delete(value)
  }

  has(value: any) {
    return this.h.get(value) === true
  }

  clear() {
    this.h.clear()
  }
}

export default HashSet

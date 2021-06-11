export interface ListADT<T> {
  length: number
  isEmpty: boolean
  get: (index: number) => T
  delete: (index: number) => T
  insert: (index: number, value: T) => void
}

export interface StackADT<T> {
  length: number
  isEmpty: boolean
  push: (value: T) => void
  pop: () => T
  peek: () => T
}

export interface QueueADT<T> {
  length: number
  isEmpty: boolean
  enqueue: (value: T) => void
  dequeue: () => T
  front: () => T
}

export interface DequeueADT<T> {
  length: number
  isEmpty: boolean
  push: (value: T) => void
  pop: () => T
  unshift: (value: T) => void
  shift: () => T
  front: () => T
  end: () => T
}

export interface HashTableADT<T> {
  size: number
  get: (key: any) => T | null
  set: (key: any, value: T) => void
  delete: (key: string) => void
  clear: () => void
}
export interface HashSetADT<T> {
  size: number
  add: (value: T) => void
  delete: (value: T) => boolean
  has: (value: T) => boolean
  clear: () => void
}

export interface HeapADT<T> {
  size: number
  peek: () => T | null
  insert: (value: T) => void
  extract: () => T | null
}

export interface PriorityQueueADT<T> extends QueueADT<T> {
  priority: (value: T) => number | null
  changePriority: (value: T, priority: number) => void
}

export interface SearchTree<T> {
  size: number
  insert: (value: T) => void
  delete: (value: T) => void
}

export interface TreapADT<T> extends SearchTree<T>, HeapADT<T> {}

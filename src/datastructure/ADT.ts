export interface ListADT<T> {
  length: number
  isEmpty(): boolean
  get(index: number): T
  delete(index: number): T
  insert(index: number, value: T): void
}

export interface StackADT<T> {
  length: number
  isEmpty(): boolean
  push(value: T): void
  pop(): T
  peek(): T
}

export interface QueueADT<T> {
  length: number
  isEmpty(): boolean
  enqueue(value: T): void
  dequeue(): T
  front(): T
}

export interface DequeueADT<T> {
  length: number
  isEmpty(): boolean
  push(value: T): void
  pop(): T
  unshift(value: T): void
  shift(): T
  front(): T
  end(): T
}

export interface HashTableADT<T> {
  size: number
  get(key: any): T | null
  set(key: any, value: T): void
  delete(key: string): void
  clear(): void
}
export interface HashSetADT {
  size: number
  add(value: any): any
  delete(value: any): boolean
  has(value: any): boolean
  clear(): void
}

export interface HeapADT<T> {
  size: number
  peek(): T | null
  insert(value: T): void
  extract(): T | null
  delete(key: string): boolean
}

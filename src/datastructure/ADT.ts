export interface ListADT<T> {
  length: number
  isEmpty(): boolean
  add(value: T): void
  get(index: number): T
  delete(index: number): T
  insert(index: number, value: T): void
  traverse(): void
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
  end(): T
}

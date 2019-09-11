export interface ListADT<T> {
  length: number
  isEmpty(): boolean
  add(value: T): void
  get(index: number): T
  delete(index: number): T
  insert(index: number, value: T): void
  traverse(): void
}

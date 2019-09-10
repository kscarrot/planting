export interface ListADT<T> {
  length: number
  isEmpty(): boolean
  get(index: number): T
  delete(index: number): T
  insert(index: number, value: T): void
  traverse(): void
}

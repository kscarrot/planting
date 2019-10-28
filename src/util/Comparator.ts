export type compareFunction<T> = {
  (a: T, b: T): 0 | 1 | -1
}

export class Comparator<T> {
  constructor(compareFn?: compareFunction<T>) {
    if (typeof compareFn === 'function') {
      this.compare = compareFn
    }
  }

  private compare(a: T, b: T) {
    if (a === b) {
      return 0
    }
    return a > b ? 1 : -1
  }

  eq(a: T, b: T) {
    return this.compare(a, b) === 0
  }

  gt(a: T, b: T) {
    return this.compare(a, b) > 0
  }

  gte(a: T, b: T) {
    return this.gt(a, b) || this.eq(a, b)
  }

  lt(a: T, b: T) {
    return this.compare(a, b) < 0
  }

  lte(a: T, b: T) {
    return this.lt(a, b) || this.eq(a, b)
  }

  reverse() {
    const origintCompareFn = this.compare
    this.compare = (a, b) => origintCompareFn(b, a)
  }
}

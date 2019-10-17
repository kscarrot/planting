export interface IPair<FirstType, SecondType> {
  first: FirstType | null
  second: SecondType | null
  toArray(): [FirstType | null, SecondType | null]
}

export class Pair<FirstType, SecondType> implements IPair<FirstType, SecondType> {
  first: FirstType | null
  second: SecondType | null
  constructor(first?: FirstType, second?: SecondType) {
    this.first = first || null
    this.second = second || null
  }

  setFirst(first: FirstType): Pair<FirstType, SecondType> {
    this.first = first
    return this
  }

  setSecond(second: SecondType): Pair<FirstType, SecondType> {
    this.second = second
    return this
  }

  toArray(): [FirstType | null, SecondType | null] {
    return [this.first, this.second]
  }
}

export default Pair

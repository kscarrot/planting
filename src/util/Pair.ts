export interface IPair<FirstType, SecondType> {
  first: FirstType
  second: SecondType
  toArray(): [FirstType, SecondType]
}

export class Pair<FirstType, SecondType> implements IPair<FirstType, SecondType> {
  private _first: FirstType
  private _second: SecondType
  constructor(first: FirstType, second: SecondType) {
    this._first = first
    this._second = second
  }

  get first() {
    return this._first
  }

  get second() {
    return this._second
  }

  set first(first: FirstType) {
    this._first = first
  }

  set second(second: SecondType) {
    this._second = second
  }

  setFirst(first: FirstType): Pair<FirstType, SecondType> {
    this._first = first
    return this
  }

  setSecond(second: SecondType): Pair<FirstType, SecondType> {
    this._second = second
    return this
  }

  toArray(): [FirstType, SecondType] {
    return [this.first, this.second]
  }
}

export default Pair

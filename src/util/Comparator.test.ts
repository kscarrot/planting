import { Comparator } from './Comparator'

test('test comparator basic', () => {
  const cmp = new Comparator()
  expect(cmp.eq(1, 2)).toBe(false)
  expect(cmp.eq(1, 1)).toBe(true)
  expect(cmp.gt(1, 1)).toBe(false)
  expect(cmp.gt(2, 1)).toBe(true)
  expect(cmp.gt(1, 2)).toBe(false)
  expect(cmp.gte(1, 2)).toBe(false)
  expect(cmp.gte(2, 1)).toBe(true)
  expect(cmp.gte(1, 1)).toBe(true)
  expect(cmp.lt(1, 1)).toBe(false)
  expect(cmp.lt(2, 1)).toBe(false)
  expect(cmp.lt(1, 2)).toBe(true)
  expect(cmp.lte(1, 2)).toBe(true)
  expect(cmp.lte(2, 1)).toBe(false)
  expect(cmp.lte(1, 1)).toBe(true)
})

test('test comparator constructor and reverse', () => {
  const strLengthCompare = (a: string, b: string) => {
    if (a.length === b.length) return 0
    return a.length > b.length ? 1 : -1
  }
  const newCmp = new Comparator(strLengthCompare)
  expect(newCmp.eq('hello', 'world')).toBe(true)
  expect(newCmp.lt('hello', 'hi')).toBe(false)
  newCmp.reverse()
  expect(newCmp.lt('hello', 'hi')).toBe(true)
})

import Pair from './Pair'

test('empty state should be [ null, null]', () => {
  const p = new Pair()
  expect(p.toArray()).toStrictEqual([null, null])
})

test('test Pair', () => {
  const p = new Pair(1, 'a')
  expect(p.first).toBe(1)
  expect(p.second).toBe('a')
  expect(p.toArray()).toStrictEqual([1, 'a'])
  // p.setFirst('1') shoud not allowed
  // chain call
  expect(p.setFirst(2).setFirst(3).first).toBe(3)
  expect(p.setSecond('b').setSecond('c').second).toBe('c')
  // test setter
  p.first = 4
  p.second = 'd'
  expect(p.first).toBe(4)
  expect(p.second).toBe('d')
})

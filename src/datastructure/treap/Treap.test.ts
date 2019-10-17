import Treap from './Treap'

test('test treap', () => {
  const tp = new Treap()
  expect(tp.isEmpty()).toBe(true)
  expect(tp.getKth(tp.root, 1)).toBe(null)
  expect(tp.delete(1)).toBe(null)
  expect(tp.peek()).toBeNull()
  expect(tp.extract()).toBeNull()
  tp.insert(1)
  expect(tp.peek()).toBe(1)
  expect(tp.extract()).toBe(1)
  tp.insert(5)
    .insert(10)
    .insert(99)
    .insert(15)
    .insert(50)
  expect(tp.size).toBe(5)

  //now [5, 10, 15, 50, 99]
  expect(tp.getRank(tp.root, 5)).toBe(1)
  expect(tp.getRank(tp.root, 10)).toBe(2)
  expect(tp.getRank(tp.root, 99)).toBe(5)
  expect([...tp]).toStrictEqual([5, 10, 15, 50, 99])

  expect(tp.getPre(15)).toBe(10)
  expect(tp.getNext(15)).toBe(50)
  expect(tp.delete(2)).toBe(10)
  expect([...tp]).toStrictEqual([5, 15, 50, 99])

  // [5, 9, 15, 50, 99, 999]
  tp.insert(9).insert(999)
  const sp = tp.splitV(tp.root, 99)
  expect(tp.getKth(sp.first, 1)).toBe(5)
  expect(tp.getKth(sp.second, 1)).toBe(99)
  expect(tp.getKth(sp.second, 2)).toBe(999)
  expect(tp.getKth(tp.root, 99)).toBe(null)
})

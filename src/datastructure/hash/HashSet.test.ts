import HashSet from './HashSet'

test('test not string type key', () => {
  const hs = new HashSet()
  hs.add(1).add(2).add(2)
  expect(hs.size).toBe(2)
  expect(hs.has(2)).toBe(true)
  expect(hs.has(3)).toBe(false)
  hs.delete(2)
  expect(hs.has(2)).toBe(false)
  hs.clear()
  expect(hs.size).toBe(0)
})

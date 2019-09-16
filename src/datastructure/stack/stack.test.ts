import { Stack } from '@ds/stack'
test('test Stack ', () => {
  const s = new Stack()
  expect(s.length).toBe(0)
  expect(s.isEmpty()).toBe(true)

  s.push(1)
  expect(s.length).toBe(1)
  expect(s.pop()).toBe(1)
  expect(() => s.pop()).toThrow()
  expect(() => s.peek()).toThrow()

  s.push(9)
  s.push(99)
  s.push(999)
  expect([...s]).toStrictEqual([9, 99, 999])
  expect(s.peek()).toBe(999)
})

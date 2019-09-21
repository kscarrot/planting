import { Dequeue } from '../queue'

test('test Queue ', () => {
  const q = new Dequeue()
  expect(q.length).toBe(0)
  expect(q.isEmpty()).toBe(true)
  q.push(1)
  q.unshift(2)
  expect(q.length).toBe(2)
  expect(q.pop()).toBe(1)
  expect(q.shift()).toBe(2)
  expect(() => q.pop()).toThrow()
  expect(() => q.shift()).toThrow()
  expect(() => q.front()).toThrow()
  expect(() => q.end()).toThrow()

  q.push(9)
  q.push(99)
  q.push(999)

  expect([...q]).toStrictEqual([9, 99, 999])
  expect(q.front()).toBe(9)
  expect(q.end()).toBe(999)
})

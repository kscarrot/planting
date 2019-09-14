import Queue from './index'

test('test Queue ', () => {
  const q = new Queue()
  expect(q.length).toBe(0)
  expect(q.isEmpty()).toBe(true)
  q.enqueue(1)
  expect(q.length).toBe(1)
  expect(q.dequeue()).toBe(1)
  expect(() => q.dequeue()).toThrow()
  expect(() => q.end()).toThrow()
  expect(() => q.front()).toThrow()

  q.enqueue(9)
  q.enqueue(99)
  q.enqueue(999)

  expect([...q]).toStrictEqual([9, 99, 999])
  expect(q.front()).toBe(9)
  expect(q.end()).toBe(999)
  expect(q.dequeue()).toBe(9)
  expect(q.dequeue()).toBe(99)
  expect(q.dequeue()).toBe(999)
})

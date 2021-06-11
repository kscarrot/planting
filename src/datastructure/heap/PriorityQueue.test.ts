import PriorityQueue from './PriorityQueue'

test('test priorityqueue', () => {
  const pq = new PriorityQueue()
  expect(pq.isEmpty).toBe(true)
  expect(() => pq.front()).toThrowError()
  expect(() => pq.dequeue()).toThrowError()
  pq.enqueue(1, 1)
  expect(pq.priority(1)).toBe(1)
  expect(pq.dequeue()).toBe(1)
  pq.enqueue(1, 1)
  pq.enqueue(1)
  pq.changePriority(1, 3)
  expect(pq.priority(1)).toBe(3)
  expect(pq.priority(2)).toBe(null)
  expect(pq.length).toBe(1)
})

test('test priority queue priority', () => {
  const pq = new PriorityQueue()
  pq.enqueue('c', 3)
  pq.enqueue('z', 26)
  pq.enqueue('b', 2)
  pq.enqueue('d', 4)
  pq.enqueue('a', 1)
  expect(pq.front()).toBe('z')
  expect([...pq]).toStrictEqual(['z', 'd', 'b', 'c', 'a'])
})

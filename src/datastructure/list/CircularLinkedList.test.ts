import { range } from 'lodash'
import { CircularLinkedList } from '../list'

test('test CircularLinkedList normal index', () => {
  const l = new CircularLinkedList()
  expect(l.isEmpty()).toBe(true)
  expect(() => l.get(1)).toThrow()

  l.add(1)
  expect(l.delete(0)).toBe(1)
  l.add(1)
  l.add(2)
  l.insert(2, 3)
  expect([...l]).toStrictEqual([1, 2, 3])
  expect(l.length).toBe(3)
  expect(l.get(1)).toBe(2)
  expect(l.delete(2)).toBe(3)
})

test('test CircularLinkedList out of boudn index', () => {
  const l = new CircularLinkedList()
  l.insert(0, 1)
  l.add(2)
  l.add(3)
  expect(l.get(5)).toBe(3)
  expect(l.get(-1)).toBe(3)
  expect(l.get(-2)).toBe(2)
  expect(l.get(-5)).toBe(2)
  expect([...l]).toStrictEqual([1, 2, 3])
})

test('test CircularLinkedList traverse', () => {
  const l = new CircularLinkedList()
  const arr = range(5)
  arr.map(e => l.add(e))
  expect([...l]).toStrictEqual(arr)
  l.insert(3, 9)
  expect([...l]).toStrictEqual([0, 1, 2, 9, 3, 4])
  l.delete(2)
  expect([...l]).toStrictEqual([0, 1, 9, 3, 4])
})

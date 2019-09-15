import { range } from 'lodash'
import { LinkedList, DoublyLinkedList } from './index'

type NumberList = LinkedList<number> | DoublyLinkedList<number>

const testInit = (l: NumberList) => {
  //test init
  expect(l.length).toBe(0)
  //add one element than delete
  l.insert(0, 1)
  expect(l.length).toBe(1)
  expect(l.get(0)).toBe(1)
  l.delete(0)
  expect(l.isEmpty()).toBe(true)
}

const testBoundary = (l: NumberList) => {
  expect(() => l.getNode(0)).toThrow()
  l.insert(0, 2)
  l.insert(0, 1)
  l.insert(2, 3)
  expect(() => l.insert(-1, 2)).toThrow()
  expect(l.length).toBe(3)
  //delete head and tail
  l.delete(2)
  l.delete(0)
  expect(l.getNode(0).value).toBe(2)
  l.delete(0)
  expect(l.isEmpty()).toBe(true)
}

const testTraverse = (l: NumberList) => {
  const arr = range(5)
  arr.map(e => l.add(e))
  expect([...l]).toStrictEqual(arr)
  l.insert(3, 9)
  expect([...l]).toStrictEqual([0, 1, 2, 9, 3, 4])
  l.delete(2)
  expect([...l]).toStrictEqual([0, 1, 9, 3, 4])
}

test('test LinkedList init', () => {
  const l = new LinkedList<number>()
  testInit(l)
})

test('test LinkedList boundary case', () => {
  const l = new LinkedList<number>()
  testBoundary(l)
})

test('test LinkedList traverse', () => {
  const l = new LinkedList<number>()
  testTraverse(l)
})

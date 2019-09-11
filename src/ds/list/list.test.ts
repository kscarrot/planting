import LinkedList from './LinkedList'

const testInit = List => {
  const l = new List()
  //test init
  expect(l.length).toBe(0)
  expect(l.head).toBe(null)
  expect(l.tail).toBe(null)
  //add one element than delete
  l.insert(0, 1)
  expect(l.length).toBe(1)
  expect(l.get(0)).toBe(1)
  expect(l.getNode(0)).toBe(l.head)
  expect(l.getNode(0)).toBe(l.tail)
  l.delete(0)
  expect(l.isEmpty()).toBe(true)
  expect(l.head).toBe(null)
  expect(l.tail).toBe(null)
}

const testBoundary = List => {
  const l = new List()
  l.insert(0, 2)
  l.insert(0, 1)
  l.insert(2, 3)
  expect(l.getNode(0)).toBe(l.head)
  expect(l.getNode(2)).toBe(l.tail)
  expect(l.length).toBe(3)

  //delete head and tail
  l.delete(2)
  l.delete(0)
  expect(l.getNode(0).value).toBe(2)
  expect(l.getNode(0)).toBe(l.head)
  expect(l.getNode(0)).toBe(l.tail)
  l.delete(0)
  expect(l.isEmpty()).toBe(true)
}

test('test linklist init', () => {
  testInit(LinkedList)
})

test('test linkdlist boundary case', () => {
  testBoundary(LinkedList)
})

import { MaxHeap, MinHeap } from './Heap'

test('test min heap basic', () => {
  const h = new MinHeap()
  expect(h.isEmpty()).toBe(true)
  expect(h.peek()).toBe(null)
  expect(h.extract()).toBe(null)
  h.insert(3)
  expect(h.peek()).toBe(3)
  h.insert(2).insert(4)
  expect(h.peek()).toBe(2)
  h.insert(1)
  expect(h.peek()).toBe(1)
  const arr1 = []
  for (let i = 0; i < 4; i++) {
    arr1.push(h.extract())
  }
  expect(arr1).toStrictEqual([1, 2, 3, 4])

  h.heapify([3, 1, 4, 2])
  expect([...h]).toStrictEqual([1, 2, 4, 3])
  const arr2 = []
  for (let i = 0; i < 4; i++) {
    arr2.push(h.extract())
  }
  expect(arr2).toStrictEqual([1, 2, 3, 4])
})

test('test max heap', () => {
  const h = new MaxHeap()
  h.heapify([3, 1, 4, 2])
  const arr = []
  for (let i = 0; i < 4; i++) {
    arr.push(h.extract())
  }
  expect(arr).toStrictEqual([4, 3, 2, 1])
})

test('test comparetor', () => {
  // TODO: uesless test
  // const strLengthCompare = (a: string, b: string) => {
  //   if (a.length === b.length) return 0
  //   return a.length > b.length ? 1 : -1
  // }
})

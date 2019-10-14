import BinarySearchTree from './BinarySearchTree'

test('test binary search tree', () => {
  const bst = new BinarySearchTree()
  expect(bst.isEmpty()).toBe(true)
  bst
    .insert(10)
    .insert(12)
    .insert(3)
    .insert(4)
    .insert(13)
    .insert(9)
    .insert(11)
  /**
   *             10
   *       3           12
   *          4      11    13
   *             9
   */
  expect(bst.size).toBe(7)
  expect([...bst]).toStrictEqual([3, 4, 9, 10, 11, 12, 13])
  bst.delete(12)
  expect([...bst]).toStrictEqual([3, 4, 9, 10, 11, 13])
  expect(bst.search(4)).toBe(4)
  expect(bst.search(12)).toBeNull()
})

test('testing bst boundary case', () => {
  const bst = new BinarySearchTree()
  expect(bst.delete(10)).toBeNull()
  bst
    .insert(4)
    .insert(3)
    .insert(2)
    .insert(1)
  bst.delete(3)
  expect([...bst]).toStrictEqual([1, 2, 4])
  bst.delete(4)
  expect([...bst]).toStrictEqual([1, 2])
  bst.clear()
  expect(bst.isEmpty()).toBe(true)
})

test('test private method findmin', () => {
  const bst = new BinarySearchTree()
  bst
    .insert(1)
    .insert(5)
    .insert(7)
    .insert(4)
    .insert(6)
  bst.delete(5)
})

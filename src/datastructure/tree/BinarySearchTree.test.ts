import BinarySearchTree from './BinarySearchTree'

test('test binary search tree', () => {
  const bst = new BinarySearchTree()
  expect(bst.isEmpty).toBe(true)
  expect(bst.max).toBe(null)
  expect(bst.min).toBe(null)
  expect(bst.getKth(1)).toBe(null)
  bst.insert(10).insert(12).insert(3).insert(4).insert(13).insert(9).insert(11)
  /**
   *             10
   *       3           12
   *          4      11    13
   *             9
   */
  expect(bst.size).toBe(7)
  expect(bst.getKth(1)).toBe(3)
  expect([...bst]).toStrictEqual([3, 4, 9, 10, 11, 12, 13])
  bst.delete(12)
  expect([...bst]).toStrictEqual([3, 4, 9, 10, 11, 13])
  expect(bst.search(4)).toBe(4)
  expect(bst.search(12)).toBeNull()
  expect([bst.getKth(1), bst.getKth(2), bst.getKth(3), bst.getKth(4), bst.getKth(5)]).toStrictEqual([3, 4, 9, 10, 11])
  expect([bst.getRank(3), bst.getRank(4), bst.getRank(9)]).toStrictEqual([1, 2, 3])
  expect(bst.getNext(9)).toBe(10)
  expect(bst.getPrev(9)).toBe(4)
  expect(bst.min).toBe(3)
  expect(bst.max).toBe(13)
})

test('test bst protect methods ', () => {
  const bst = new BinarySearchTree()
  bst.insert(10).insert(12).insert(3).insert(4).insert(13).insert(9).insert(11).insert(2).insert(1)
  /**
   *             10
   *       3           12
   *     2    4      11    13
   *  1          9
   */
  // eslint-disable-next-line @typescript-eslint/dot-notation
  expect(bst['getNodeSize'](bst.root)).toBe(9)
  // eslint-disable-next-line @typescript-eslint/dot-notation
  expect(bst['getNodeSize'](bst.root?.left?.left ?? null)).toBe(2)
})

test('testing bst boundary case', () => {
  const bst = new BinarySearchTree()
  expect(bst.delete(10)).toBeNull()
  bst.insert(4).insert(3).insert(2).insert(1)
  bst.delete(3)
  expect([...bst]).toStrictEqual([1, 2, 4])
  bst.delete(4)
  expect([...bst]).toStrictEqual([1, 2])
  bst.clear()
  expect(bst.isEmpty).toBe(true)
})

test('test private method findmin', () => {
  const bst = new BinarySearchTree()
  bst.insert(1).insert(5).insert(7).insert(4).insert(6)
  bst.delete(5)
})

import { arrayToTree } from './arrayToTree'

test('test generated binary tree', () => {
  /**
   *    1
   *   / \
   * 2     3
   */
  const t = arrayToTree([1, 2, 3])
  expect(t?.value).toBe(1)
  expect(t?.left?.value).toBe(2)
  expect(t?.right?.value).toBe(3)

  /**
   *         1
   *        / \
   *       2    3
   *      / \   / \
   *     4   n 6   n
   *    /       \
   *   8        13
   */
  const t1 = arrayToTree([1, 2, 3, 4, null, 6, null, 8, null, null, null, null, 13])
  expect(t1?.left?.left?.left?.value).toBe(8)
  expect(t1?.right?.right).toBeNull()
  expect(t1?.right?.left?.right?.value).toBe(13)
})

import { cmp } from './index'

function heapSort<T>(nums: T[]) {
  // 构建堆
  for (let i = nums.length >> 1; i >= 0; i--) {
    sink(nums, i, nums.length)
  }
  // 将堆顶最大元素移至末尾,此时首部元素不是最大了,再次调整堆
  for (let i = nums.length - 1; i > 0; i--) {
    ;[nums[0], nums[i]] = [nums[i], nums[0]]
    sink(nums, 0, i)
  }

  return nums
}

/**
 *
 * @param arr 待排序数组
 * @param index 开始的索引
 * @param range 待排序范围
 * @description 在range内查找目标元素的左右子节点,将三者较大的元素放至父节点,然后重新调整子节点
 *
 */
function sink<T>(arr: T[], index: number, range: number) {
  let p = index * 2 + 1
  /**
   * @description while 写法
   ```
  while (p < range) {
    if (p + 1 < range && cmp.lt(arr[p], arr[p + 1])) p++
    if (cmp.lt(arr[p], arr[index])) break
    ;[arr[index], arr[p]] = [arr[p], arr[index]]
    index = p
    p = index * 2 + 1
  }
   ```
   */

  for (let p = index * 2 + 1; p < range; index = p, p = index * 2 + 1) {
    if (p + 1 < range && cmp.lt(arr[p], arr[p + 1])) p++
    if (cmp.lt(arr[p], arr[index])) break
    ;[arr[index], arr[p]] = [arr[p], arr[index]]
  }
}

export default heapSort

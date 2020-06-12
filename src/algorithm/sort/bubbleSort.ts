import { cmp } from './index'
function bubbleSort<T>(nums: T[]) {
  if (nums.length === 0 || nums.length === 1) {
    return nums
  }
  let flag = true
  let range = nums.length - 1
  while (flag) {
    flag = false
    for (let i = 0; i < range; i++) {
      if (cmp.gt(nums[i], nums[i + 1])) {
        ;[nums[i], nums[i + 1]] = [nums[i + 1], nums[i]]
        flag = true
      }
    }
    range--
  }
  return nums
}

export default bubbleSort

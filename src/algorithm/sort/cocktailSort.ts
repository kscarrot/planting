import { cmp } from './index'

function cocktailSort<T>(nums: T[]) {
  let swapped = true
  let right = nums.length - 1
  let left = 0
  let flag = 0
  while (swapped) {
    swapped = false
    for (let i = 0; i < right; i++) {
      if (cmp.gt(nums[i], nums[i + 1])) {
        ;[nums[i], nums[i + 1]] = [nums[i + 1], nums[i]]
        swapped = true
        flag = i
      }
    }

    right = flag

    for (let i = right; i > left; i--) {
      if (cmp.lt(nums[i], nums[i + 1])) {
        ;[nums[i], nums[i - 1]] = [nums[i - 1], nums[i]]
        swapped = true
        flag = i
      }
    }

    left = flag
  }
  return nums
}

export default cocktailSort

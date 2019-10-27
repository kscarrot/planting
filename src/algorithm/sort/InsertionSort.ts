import { cmp } from './index'

function InsertionSort<T>(nums: T[]) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j > 0; j--) {
      if (cmp.lt(nums[j], nums[j - 1])) {
        ;[nums[j], nums[j - 1]] = [nums[j - 1], nums[j]]
      }
    }
  }
  return nums
}

function BinaryInsertionSort<T>(nums: T[]) {
  for (let i = 0; i < nums.length; i++) {
    let [left, right] = [0, i - 1]
    while (left <= right) {
      const mid = (right + left) >> 1
      if (cmp.lt(nums[i], nums[mid])) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    for (let j = i - 1; j >= left; j--) {
      ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
    }
  }

  return nums
}

export { InsertionSort, BinaryInsertionSort }

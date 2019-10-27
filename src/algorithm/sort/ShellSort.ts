import { cmp } from './index'

function ShellSort<T>(nums: T[]) {
  for (let gap = nums.length >> 1; gap > 0; gap = gap >> 1) {
    for (let i = gap; i < nums.length; i++) {
      for (let j = i; j > 0; j -= gap) {
        if (nums[j] && nums[j - gap]) {
          if (cmp.lt(nums[j], nums[j - gap])) {
            ;[nums[j], nums[j - gap]] = [nums[j - gap], nums[j]]
          }
        }
      }
    }
  }
  return nums
}

export default ShellSort

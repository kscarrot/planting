import { cmp } from './index'

function SelectionSort<T>(nums: T[]) {
  for (let i = 0; i < nums.length; i++) {
    let point = i
    for (let j = i + 1; j < nums.length; j++) {
      if (cmp.lt(nums[j], nums[point])) {
        point = j
      }
    }
    ;[nums[i], nums[point]] = [nums[point], nums[i]]
  }
  return nums
}

export default SelectionSort

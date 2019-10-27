import { cmp } from './index'

function mergeSort<T>(nums: T[]): T[] {
  if (nums.length <= 1) return nums
  const mid = nums.length >> 1
  const left = nums.slice(0, mid)
  const right = nums.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

function merge<T>(a: T[], b: T[]) {
  const temp = []
  let [i, j] = [0, 0]
  while (i < a.length && j < b.length) {
    cmp.lt(a[i], b[j]) ? temp.push(a[i++]) : temp.push(b[j++])
  }
  return temp.concat(i < a.length ? a.slice(i) : b.slice(j))
}

export default mergeSort

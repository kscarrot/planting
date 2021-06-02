import { cmp } from './index'

/**
 *  以下都不算严格意义上生产环境中的快排,但足够用来理解快排中分治的思想
 *  *QuickSort*中的concat,*QuickSortES6*中的解构都是有消耗的
 *  *QuickSort3While*这个是比较容易被面试官接受的版本但是易错
 *  另外以上三个都没有使用随机游标
 *  人生苦短,我用.sort()
 */

function quickSort<T>(arr: T[]): T[] {
  if (arr.length <= 1) return arr
  const leftarr = []
  const rightarr = []
  for (let i = 1; i < arr.length; i++) {
    cmp.lt(arr[0], arr[i]) ? rightarr.push(arr[i]) : leftarr.push(arr[i])
  }
  return quickSort(leftarr).concat(arr[0]).concat(quickSort(rightarr))
}

const quickSortES6 = <T>(arr: T[]): T[] =>
  arr.length <= 1
    ? arr
    : [
        ...quickSortES6(arr.filter((e) => cmp.lt(e, arr[0]))),
        ...arr.filter((e) => cmp.eq(e, arr[0])),
        ...quickSortES6(arr.filter((e) => cmp.gt(e, arr[0]))),
      ]

function quickSort3While<T>(arr: T[], left: number = 0, right: number = arr.length - 1) {
  if (arr.length === 0 || left > right) return []
  let lp = left
  let rp = right
  const pivot = arr[left]
  while (lp !== rp) {
    while (cmp.gte(arr[rp], pivot) && cmp.lt(lp, rp)) rp--
    while (cmp.lte(arr[lp], pivot) && cmp.lt(lp, rp)) lp++
    if (lp < rp) [arr[lp], arr[rp]] = [arr[rp], arr[lp]]
  }
  ;[arr[left], arr[lp]] = [arr[lp], arr[left]]
  quickSort3While(arr, left, lp - 1)
  quickSort3While(arr, lp + 1, right)
  return arr
}

export { quickSort, quickSortES6, quickSort3While }

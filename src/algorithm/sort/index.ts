import { Comparator } from '../../util'
import bubbleSort from './bubbleSort'
import cocktailSort from './cocktailSort'
import heapSort from './heapSort'
import { insertionSort, binaryInsertionSort } from './insertionSort'
import mergeSort from './mergeSort'
import { quickSort, quickSortES6, quickSort3While } from './quickSort'
import selectionSort from './selectionSort'
export const cmp = new Comparator()

export {
  bubbleSort,
  cocktailSort,
  heapSort,
  insertionSort,
  binaryInsertionSort,
  mergeSort,
  quickSort,
  quickSortES6,
  quickSort3While,
  selectionSort,
}

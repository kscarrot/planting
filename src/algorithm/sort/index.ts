import { comparator } from '../../util'
import BubbleSort from './BubbleSort'
import CocktailSort from './CocktailSort'
import HeapSort from './HeapSort'
import { InsertionSort, BinaryInsertionSort } from './InsertionSort'
import MergeSort from './MergeSort'
import { QuickSort, QuickSortES6, QuickSort3While } from './QuickSort'
import SelectionSort from './SelectionSort'
import ShellSort from './ShellSort'
export const cmp = new comparator()

export {
  BubbleSort,
  CocktailSort,
  HeapSort,
  InsertionSort,
  BinaryInsertionSort,
  MergeSort,
  QuickSort,
  QuickSortES6,
  QuickSort3While,
  SelectionSort,
  ShellSort,
}

import { randomArray } from '../../util'
import {
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
} from './index'
type sortFn = (arr: number[]) => number[]

const ArraySortCmp = (sortFn: sortFn) => {
  const rightAnswer = (arr: number[]) => Array.from(arr).sort((a, b) => a - b)
  expect(sortFn([])).toStrictEqual([])
  expect(sortFn([1])).toStrictEqual([1])
  expect(sortFn([2, 1])).toStrictEqual([1, 2])
  expect(sortFn([999, 99, 9])).toStrictEqual([9, 99, 999])
  expect(sortFn([11, 11, 11, 11, 11])).toStrictEqual([11, 11, 11, 11, 11])
  const arrL10 = randomArray(10)
  expect(sortFn(arrL10)).toStrictEqual(rightAnswer(arrL10))
  const arrL99 = randomArray(99)
  expect(sortFn(arrL99)).toStrictEqual(rightAnswer(arrL99))
}

test('test BubbleSort ', () => {
  ArraySortCmp(bubbleSort)
})

test('test CocktailSort ', () => {
  ArraySortCmp(cocktailSort)
})

test('test HeapSort ', () => {
  ArraySortCmp(heapSort)
})

test('test InsertionSort ', () => {
  ArraySortCmp(insertionSort)
})

test('test BinaryInsertionSort ', () => {
  ArraySortCmp(binaryInsertionSort)
})

test('test MergeSort ', () => {
  ArraySortCmp(mergeSort)
})

test('test SelectionSort ', () => {
  ArraySortCmp(selectionSort)
})

test('test QuickSort ', () => {
  ArraySortCmp(quickSort)
})

test('test QuickSortES6 ', () => {
  ArraySortCmp(quickSortES6)
})

test('test QuickSort3While ', () => {
  ArraySortCmp(quickSort3While)
})

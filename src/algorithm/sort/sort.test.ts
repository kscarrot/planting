import { RandomArray } from '../../util'
import {
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
} from './index'
type sortFn = (arr: number[]) => number[]

const ArraySortCmp = (sortFn: sortFn) => {
  const rightAnswer = (arr: number[]) => Array.from(arr).sort((a, b) => a - b)
  expect(sortFn([])).toStrictEqual([])
  expect(sortFn([1])).toStrictEqual([1])
  expect(sortFn([2, 1])).toStrictEqual([1, 2])
  expect(sortFn([999, 99, 9])).toStrictEqual([9, 99, 999])
  expect(sortFn([11, 11, 11, 11, 11])).toStrictEqual([11, 11, 11, 11, 11])
  const arrL10 = RandomArray(10)
  expect(sortFn(arrL10)).toStrictEqual(rightAnswer(arrL10))
  const arrL99 = RandomArray(99)
  expect(sortFn(arrL99)).toStrictEqual(rightAnswer(arrL99))
}

test('test BubbleSort ', () => {
  ArraySortCmp(BubbleSort)
})

test('test CocktailSort ', () => {
  ArraySortCmp(CocktailSort)
})

test('test HeapSort ', () => {
  ArraySortCmp(HeapSort)
})

test('test InsertionSort ', () => {
  ArraySortCmp(InsertionSort)
})

test('test BinaryInsertionSort ', () => {
  ArraySortCmp(BinaryInsertionSort)
})

test('test MergeSort ', () => {
  ArraySortCmp(MergeSort)
})

test('test SelectionSort ', () => {
  ArraySortCmp(SelectionSort)
})

test('test ShellSort ', () => {
  ArraySortCmp(ShellSort)
})

test('test QuickSort ', () => {
  ArraySortCmp(QuickSort)
})

test('test QuickSortES6 ', () => {
  ArraySortCmp(QuickSortES6)
})

test('test QuickSort3While ', () => {
  ArraySortCmp(QuickSort3While)
})

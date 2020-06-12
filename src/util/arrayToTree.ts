import { TreeNodeBisic } from '../datastructure/tree/BinarySearchTree'

export type TreeArray = (number | null)[]

const arrayToTree = (arr: TreeArray) => nodeChild(0, arr)

const nodeChild = (i: number, arr: TreeArray) => {
  if (i >= arr.length) return null
  if (arr[i] === null) return null
  const root = new TreeNodeBisic<number>(<number>arr[i])
  root.left = nodeChild(2 * i + 1, arr)
  root.right = nodeChild(2 * i + 2, arr)
  return root
}

export { arrayToTree }

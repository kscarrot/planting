import { TreeNode } from 'datastructure/tree/BinarySearchTree'

export enum TraverseType {
  'preorder',
  'inorder',
  'postorder',
}

function* traverse(root: TreeNode<number>, type: TraverseType) {
  function* order(root: TreeNode<number>): Generator<number> {
    if (root) {
      if (type === TraverseType.preorder) yield root.value
      yield* order(root.left)
      if (type === TraverseType.inorder) yield root.value
      yield* order(root.right)
      if (type === TraverseType.postorder) yield root.value
    }
  }
  yield* order(root)
}

const traverseResult = (root: TreeNode<number>, type: TraverseType) => {
  const result: number[] = []
  for (const e of traverse(root, type)) {
    result.push(e)
  }
  return result
}

export { traverse, traverseResult }

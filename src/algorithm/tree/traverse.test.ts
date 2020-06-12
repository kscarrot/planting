import { traverseResult, TraverseType } from './traverse'
import { arrayToTree } from '../../util/arrayToTree'

describe('binary tree order traverse', () => {
  it('empty case', () => {
    const tree = arrayToTree([])
    expect(traverseResult(tree, TraverseType.inorder).length).toBe(0)
    expect(traverseResult(tree, TraverseType.preorder).length).toBe(0)
    expect(traverseResult(tree, TraverseType.postorder).length).toBe(0)
  })

  it('preorder', () => {
    const tree = arrayToTree([1, 2, 3])
    expect(traverseResult(tree, TraverseType.preorder)).toStrictEqual([1, 2, 3])
  })

  it('inorder', () => {
    const tree = arrayToTree([1, 2, 3])
    expect(traverseResult(tree, TraverseType.inorder)).toStrictEqual([2, 1, 3])
  })

  it('postorder', () => {
    const tree = arrayToTree([1, 2, 3])
    expect(traverseResult(tree, TraverseType.postorder)).toStrictEqual([2, 3, 1])
  })
})

import { bfs, dfs, dfsr } from './search'
import { arrayToTree } from '../../util/arrayToTree'

describe('binary tree bfs', () => {
  it('bfs null', () => {
    expect(bfs(null)).toStrictEqual([])
  })

  it('bfs normal tree', () => {
    const t1 = arrayToTree([1, 2, 3, null, 5, 6, 7])
    expect(bfs(t1)).toStrictEqual([1, 2, 3, 5, 6, 7])
    const t2 = arrayToTree([1, 2, 3, null, 5, 6, 7, null, null, 10])
    expect(bfs(t2)).toStrictEqual([1, 2, 3, 5, 6, 7, 10])
  })
})

describe('binary tree dfs', () => {
  it('dfs null', () => {
    expect(dfs(null)).toStrictEqual([])
    expect(dfsr(null)).toStrictEqual([])
  })

  it('dfs normal tree', () => {
    const t1 = arrayToTree([1, 2, 3, null, 5, 6, 7])
    expect(dfs(t1)).toStrictEqual([1, 2, 5, 3, 6, 7])
    expect(dfsr(t1)).toStrictEqual([1, 2, 5, 3, 6, 7])

    const t2 = arrayToTree([1, 2, 3, null, 5, 6, 7, null, null, 10])
    expect(dfs(t2)).toStrictEqual([1, 2, 5, 10, 3, 6, 7])
    expect(dfsr(t2)).toStrictEqual([1, 2, 5, 10, 3, 6, 7])
  })
})

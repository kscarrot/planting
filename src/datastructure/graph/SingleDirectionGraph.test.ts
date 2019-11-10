import SingleDirectionGraph from './SingleDirectionGraph'

test('test single direction graph', () => {
  const g = new SingleDirectionGraph()
  g.addEdge(1, 2)
  g.addEdge(2, 3, 2)
  g.addEdge(1, 3, 4)
  expect(g.neighbors(1)).toStrictEqual([2, 3])
  expect(g.getEdge(1, 2)).toBe(1)
  expect(g.getEdge(1, 5)).toBeNull()
  expect(() => g.addVertex(1)).toThrowError()
  expect(() => g.neighbors(99)).toThrowError()
})

type Vertex = number
type Edge = number
type VertexSet = Set<Vertex>
type AdjacencyEdge = Map<Vertex, Edge>
type VertextList = Map<Vertex, AdjacencyEdge>

class SingleDirectionGraph {
  vertices: VertexSet = new Set()
  adjacencyList: VertextList = new Map()

  addVertex(v: Vertex) {
    if (this.vertices.has(v)) {
      throw new Error(`Vertext ${v} has been added`)
    }
    this.vertices.add(v)
    this.adjacencyList.set(v, new Map())
    return this
  }

  addEdge(a: Vertex, b: Vertex, w: Edge = 1) {
    if (!this.adjacencyList.has(a)) this.addVertex(a)
    if (!this.adjacencyList.has(b)) this.addVertex(b)
    const startVertex = this.adjacencyList.get(a) as AdjacencyEdge
    startVertex.set(b, w)
    return this
  }

  neighbors(v: Vertex) {
    const target = this.adjacencyList.get(v)
    if (target == null) {
      throw new Error(`vertex ${v} now is not exist`)
    }
    return [...target.keys()]
  }

  getEdge(a: Vertex, b: Vertex) {
    const edge = this.adjacencyList.get(a)?.get(b)
    return edge ?? null
  }
}

export default SingleDirectionGraph

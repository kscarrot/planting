import LinkedList from './LinkedList'

test('test list adt', () => {
  const l = new LinkedList()
  l.insert(0, 1)
  l.insert(0, 2)
  l.insert(0, 3)
  expect(l.length).toBe(3)
})

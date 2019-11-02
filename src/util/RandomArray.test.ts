import RandomArray from './randomArray'

test('should be empty', () => {
  expect(RandomArray(-1)).toStrictEqual([])
})

test('should be interger', () => {
  expect(RandomArray(3.5).length).toBe(3)
})

test('normal case', () => {
  expect(RandomArray(10).length).toBe(10)
})

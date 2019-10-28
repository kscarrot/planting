import randomArray from './randomArray'

test('should be empty', () => {
  expect(randomArray(-1)).toStrictEqual([])
})

test('should be interger', () => {
  expect(randomArray(3.5).length).toBe(3)
})

test('normal case', () => {
  expect(randomArray(10).length).toBe(10)
})

function randomArrayGenerator(length: number) {
  if (length <= 0) return []
  const arr = []
  for (let i = 0; i < Math.floor(length); i++) {
    arr.push(Math.floor(Math.random() * 100))
  }
  return arr
}

export default randomArrayGenerator

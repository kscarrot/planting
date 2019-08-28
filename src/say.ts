interface printFuc {
  (x: Array<number>): void
}

const say: printFuc = array => array.map(e => console.log(e))

const arr = [1, 2, 3, 4, 5]

say(arr)

console.log('end')

export default say

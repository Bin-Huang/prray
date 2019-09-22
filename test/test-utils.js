const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const isGte3Async = (v) => delay(100).then(() => v >= 3)
const isGte3 = (v) => v >= 3

const isEven = (i) => i % 2 === 0
const isEvenAsync = (i) => delay(100).then(() => i % 2 === 0)

const addOneAsync = (i) => delay(100).then(() => i + 1)
const addOne = (i) => i + 1

const genRandArr = () => [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]

module.exports = {
  delay,
  isGte3,
  isGte3Async,
  isEven,
  isEvenAsync,
  addOne,
  addOneAsync,
  genRandArr,
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const isGte3Async = (v: number) => delay(100).then(() => v >= 3)
const isGte3 = (v: number) => v >= 3

const isEven = (i: number) => i % 2 === 0
const isEvenAsync = (i: number) => delay(100).then(() => i % 2 === 0)

const addOneAsync = (i: number) => delay(100).then(() => i + 1)
const addOne = (i: number) => i + 1

const genRandArr = () => [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]

export {
  delay,
  isGte3,
  isGte3Async,
  isEven,
  isEvenAsync,
  addOne,
  addOneAsync,
  genRandArr,
}

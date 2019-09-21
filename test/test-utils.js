const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms))

const isOne = (v) => delay(100).then(() => v === 1)

const isGte3 = (v) => delay(100).then(() => v >= 3)

const genRandArr = () => [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]

module.exports = {
  delay,
  isOne,
  isGte3,
  genRandArr,
}

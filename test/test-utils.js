const { delay } = require('../src/utils')

const isOne = (v) => delay(100).then(() => v === 1)

const isGte3 = (v) => delay(100).then(() => v >= 3)

module.exports = {
  isOne,
  isGte3,
}

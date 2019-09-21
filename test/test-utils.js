const { delay } = require('../src/utils')

const isOne = (v) => delay(100).then(() => v === 1)

module.exports = {
  isOne,
}

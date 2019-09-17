const methods = require('./methods/index')
const { prraypromise } = require('./prraypromise')

module.exports = class Prray extends Array {
  constructor(...arg) {
    super(...arg)
  }
  map(mapper) {
    console.log(this)

    const result = []
    for (const v of this) {
      result.push(mapper(v))
    }

    if (result.some((v) => v instanceof Promise)) {
      return prraypromise(Promise.all(result))
    }
    return new Prray(...result)
  }
}

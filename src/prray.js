const methods = require('./methods/index')

module.exports = class Prray extends Array {
  constructor(...arg) {
    super(...arg)
  }
  map(mapper) {
    return methods.map(mapper).bind(this)
  }
}

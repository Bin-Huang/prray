const { prraypromise, setPrray } = require('./prraypromise')
const { map, filter, find, findIndex } = require('./methods')

class Prray extends Array {
  constructor(...arg) {
    super(...arg)
  }
  map(mapper) {
    const promise = map(this, mapper)
    return prraypromise(promise)
  }
  filter(func) {
    const promise = filter(this, func)
    return prraypromise(promise)
  }
  find(func) {
    return find(this, func)
  }
  findIndex(func) {
    return findIndex(this, func)
  }
}

setPrray(Prray)

module.exports = Prray

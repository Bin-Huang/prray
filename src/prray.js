const { prraypromise, setPrray } = require('./prraypromise')
const { map, filter } = require('./methods')

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
}

setPrray(Prray)

module.exports = Prray

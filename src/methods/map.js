const prraypromise = require('../prraypromise')
const { wait } = require('../utils')

function map (mapper) {
  if (this instanceof Promise) {
    const promise = this.then((r) => _map(r, mapper))
    return prraypromise(promise)
  }
  return prraypromise(_map(this, mapper))
}

function _map(arr, mapper) {
  const result = arr.map(mapper)
  return wait(result)
}

module.exports = map

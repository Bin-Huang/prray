const { wait } = require('../utils')

function map (mapper) {
  if (this instanceof Promise) {
    const promise = this.then((r) => _map(r, mapper))
    return promise
  }
  return _map(this, mapper)
}

function _map(arr, mapper) {
  const result = []
  for (const item of arr) {
    result.push(mapper(item))
  }
  return wait(result)
}

module.exports = map

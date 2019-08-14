const methods = require('./methods/index')

module.exports = function prraypromise(promise) {
  for (const name in methods) {
    promise[name] = methods[name]
  }
  return promise
}

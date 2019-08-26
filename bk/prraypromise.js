const methods = require('./methods/index')

function prraypromise (promise) {
  for (const name in methods) {
    promise[name] = methods[name]
  }
  return promise
}

module.exports = prraypromise

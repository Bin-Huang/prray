const methods = require('./methods/index')

class PrrayPromise extends Promise {
  constructor(props) {
    super(props)
  }
  map(mapper) {
    return methods.map(mapper).bind(this)
  }
}

function prraypromise(promise) {
  if (promise instanceof Promise) {
    return new PrrayPromise((resolve, reject) => {
      promise.then(resolve)
      promise.catch(reject)
    })
  }
  throw new Error('expected promise')
}

module.exports = { PrrayPromise, prraypromise }

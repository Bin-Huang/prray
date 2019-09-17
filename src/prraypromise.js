const methods = require('./methods/index')
const Prray = require('./prray')

class PrrayPromise extends Promise {
  constructor(props) {
    super(props)
  }
  map(mapper) {
    return this.then((arr) => {
      const result = []
      for (const v of arr) {
        result.push(mapper(v))
      }

      if (result.some((v) => v instanceof Promise)) {
        return prraypromise(Promise.all(result))
      }
      return new Prray(...result)
    })
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

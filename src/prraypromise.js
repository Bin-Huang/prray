const methods = require('./methods/index')

class PrrayPromise extends Promise {
  constructor(props, Prray) {
    super(props)
    this.Prray = Prray
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
      return new this.Prray(...result)
    })
  }
}

function prraypromise(promise, Prray) {
  if (promise instanceof Promise) {
    return new PrrayPromise((resolve, reject) => {
      promise.then(resolve)
      promise.catch(reject)
    }, Prray)
  }
  throw new Error('expected promise')
}

module.exports = { PrrayPromise, prraypromise }

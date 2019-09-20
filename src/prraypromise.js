const { map, filter } = require('./methods')

let Prray
function setPrray(theClass) {
  Prray = theClass
}

class PrrayPromise extends Promise {
  constructor(props) {
    super(props)
  }
  map(mapper) {
    const promise = this.then(v => map(v, mapper))
    return prraypromise(promise)
  }
  filter(func) {
    const promise = this.then(v => filter(v, func))
    return prraypromise(promise)
  }
}

function prraypromise(promise) {
  if (promise instanceof Promise) {
    return new PrrayPromise((resolve, reject) => {
      promise.then((v) => {
        if (v instanceof Array) {
          resolve(new Prray(...v))
        } else {
          resolve(v)
        }
      })
      promise.catch(reject)
    })
  }
  throw new Error('expected promise')
}

module.exports = { PrrayPromise, prraypromise, setPrray }

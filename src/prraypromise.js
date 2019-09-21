const { map, filter, find, findIndex } = require('./methods')

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
  find(func) {
    return this.then(v => find(v, func))
  }
  findIndex(func) {
    return this.then(v => findIndex(v, func))
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

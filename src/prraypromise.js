const methods = require('./methods')

let Prray
function setPrray(theClass) {
  Prray = theClass
}

class PrrayPromise extends Promise {
  constructor(props) {
    super(props)
  }
  map(mapper) {
    const promise = this.then(v => methods.map(v, mapper))
    return prraypromise(promise)
  }
  filter(func) {
    const promise = this.then(v => methods.filter(v, func))
    return prraypromise(promise)
  }
  find(func) {
    return this.then(v => methods.find(v, func))
  }
  findIndex(func) {
    return this.then(v => methods.findIndex(v, func))
  }
  every(func) {
    return this.then(v => methods.every(v, func))
  }
  some(func) {
    return this.then(v => methods.some(v, func))
  }
  forEach(func) {
    return this.then(v => methods.forEach(v, func))
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

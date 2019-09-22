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
  reduce(func, initialValue) {
    const promise = this.then(v => methods.reduce(v, func, initialValue))
    return prraypromise(promise)
  }
  reduceRight(func, initialValue) {
    const promise = this.then(v => methods.reduceRight(v, func, initialValue))
    return prraypromise(promise)
  }
  sort(func) {
    const promise = this.then(v => methods.sort(v, func))
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
      promise.then((arr) => {
        if (arr instanceof Array) {
          resolve(new Prray(arr))
        } else {
          resolve(arr)
        }
      })
      promise.catch(reject)
    })
  }
  throw new Error('expected promise')
}

module.exports = { PrrayPromise, prraypromise, setPrray }

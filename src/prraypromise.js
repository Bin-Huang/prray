const methods = require('./methods')

let prrayConvertor
function setPrrayConvertor(thePrrayConvertor) {
  prrayConvertor = thePrrayConvertor
}

class PrrayPromise extends Promise {
  constructor(props) {
    super(props)
  }
  mapAsync(mapper) {
    const promise = this.then(v => methods.map(v, mapper))
    return prraypromise(promise)
  }
  filterAsync(func) {
    const promise = this.then(v => methods.filter(v, func))
    return prraypromise(promise)
  }
  reduceAsync(func, initialValue) {
    const promise = this.then(v => methods.reduce(v, func, initialValue))
    return prraypromise(promise)
  }
  reduceRightAsync(func, initialValue) {
    const promise = this.then(v => methods.reduceRight(v, func, initialValue))
    return prraypromise(promise)
  }
  sortAsync(func) {
    const promise = this.then(v => methods.sort(v, func))
    return prraypromise(promise)
  }
  findAsync(func) {
    return this.then(v => methods.find(v, func))
  }
  findIndexAsync(func) {
    return this.then(v => methods.findIndex(v, func))
  }
  everyAsync(func) {
    return this.then(v => methods.every(v, func))
  }
  someAsync(func) {
    return this.then(v => methods.some(v, func))
  }
  forEachAsync(func) {
    return this.then(v => methods.forEach(v, func))
  }
  slice(start, end) {
    const promise = this.then(v => methods.slice(v, start, end))
    return prraypromise(promise)
  }
}

function prraypromise(promise) {
  if (promise instanceof Promise) {
    return new PrrayPromise((resolve, reject) => {
      promise.then((arr) => {
        if (arr instanceof Array) {
          resolve(prrayConvertor(arr))
        } else {
          resolve(arr)
        }
      })
      promise.catch(reject)
    })
  }
  throw new Error('expected promise')
}

module.exports = { PrrayPromise, prraypromise, setPrrayConvertor }

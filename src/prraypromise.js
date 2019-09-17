const methods = require('./methods/index')

class PrrayPromise extends Promise {
  constructor(props) {
    super(props)
  }
}

function prraypromise(promise) {
  promise['map'] = function (mapper) {
    const promise = this.then(() => {
      const result = methods.map.bind(this)(mapper)
      return prraypromise(result)
    })
    return prraypromise(promise)
  }
  return promise
}
module.exports = prraypromise
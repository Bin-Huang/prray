const { prraypromise, setPrrayConvertor } = require('./prraypromise')
const methods = require('./methods')

class Prray extends Array {
  constructor(...args) {
    super(...args)
  }
  mapAsync(mapper) {
    const promise = methods.map(this, mapper)
    return prraypromise(promise)
  }
  filterAsync(func) {
    const promise = methods.filter(this, func)
    return prraypromise(promise)
  }
  reduceAsync(func, initialValue) {
    const promise = methods.reduce(this, func, initialValue)
    return prraypromise(promise)
  }
  reduceRightAsync(func, initialValue) {
    const promise = methods.reduceRight(this, func, initialValue)
    return prraypromise(promise)
  }
  sortAsync(func) {
    const promise = methods.sort(this, func)
    return prraypromise(promise)
  }
  findAsync(func) {
    return methods.find(this, func)
  }
  findIndexAsync(func) {
    return methods.findIndex(this, func)
  }
  everyAsync(func) {
    return methods.every(this, func)
  }
  someAsync(func) {
    return methods.some(this, func)
  }
  forEachAsync(func) {
    return methods.forEach(this, func)
  }
  slice(start, end) {
    // 虽然原生 slice 也可以返回 Prray，但为了兼容其他环境(比如其他浏览器实现)，因此覆盖
    const result = methods.slice(this, start, end)
    return prray(result)
  }
}

function prray(arr) {
  if (arr.length === 1) {
    const prr = new Prray()
    prr[0] = arr[0]
    return prr
  } else {
    return new Prray(...arr)
  }
}

setPrrayConvertor(prray)

module.exports = { Prray, prray }

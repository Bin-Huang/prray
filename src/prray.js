const prraypromise = require('./prraypromise')

export class Prray extends Array {
  constructor(...arg) {
    super(...arg)
  }
  map(mapper, concurrency) {
    return prraypromise(Promise.resolve(this)).map(mapper, concurrency)
  }
  filter(filterer, concurrency) {
    return prraypromise(Promise.resolve(this)).filter(filterer, concurrency)
  }
  reduce(reducer, initialValue) {
    return prraypromise(Promise.resolve(this)).reduce(reducer, initialValue)
  }
  every(tester, concurrency) {
    return prraypromise(Promise.resolve(this)).every(tester, concurrency)
  }
  some(tester, concurrency) {
    return prraypromise(Promise.resolve(this)).some(tester, concurrency)
  }
  find(tester, concurrency) {
    return prraypromise(Promise.resolve(this)).find(tester, concurrency)
  }
  findIndex(tester, concurrency) {
    return prraypromise(Promise.resolve(this)).findIndex(tester, concurrency)
  }
  toArray() {
    return [...this]
  }
}

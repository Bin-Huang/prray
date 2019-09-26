import { Prray } from './prray'

// TODO: prray methods -> prraypromise methods

class PrrayPromise<T> extends Promise<Prray<T>> {
  constructor(props: (resolve: any, reject: any) => any) {
    super(props)
  }
  mapAsync(mapper: any) {
    return this.then(prray => prray.mapAsync(mapper))
  }
  filterAsync(func: any) {
    return this.then(prray => prray.filterAsync(func))
  }
  reduceAsync(func: any, initialValue?: any) {
    return this.then(prray => prray.reduceAsync(func, initialValue))
  }
  reduceRightAsync(func: any, initialValue?: any) {
    return this.then(prray => prray.reduceRightAsync(func, initialValue))
  }
  sortAsync(func?: any) {
    return this.then(prray => prray.sortAsync(func))
  }
  findAsync(func: any) {
    return this.then(prray => prray.findAsync(func))
  }
  findIndexAsync(func: any) {
    return this.then(prray => prray.findIndexAsync(func))
  }
  everyAsync(func: any) {
    return this.then(prray => prray.everyAsync(func))
  }
  someAsync(func: any) {
    return this.then(prray => prray.someAsync(func))
  }
  forEachAsync(func: any) {
    return this.then(prray => prray.forEachAsync(func))
  }
  slice(start?: number, end?: number) {
    return this.then(prray => prray.slice(start, end))
  }
}

function prraypromise<T>(promise: Promise<Prray<T>>) {
  return new PrrayPromise<T>((resolve, reject) => {
    promise.then(resolve)
    promise.catch(reject)
  })
}

export { PrrayPromise, prraypromise }

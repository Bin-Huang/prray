import { Prray } from './prray'

// TODO: prray methods -> prraypromise methods

class PrrayPromise<T> extends Promise<Prray<T>> {
  constructor(props: (resolve: any, reject: any) => any) {
    super(props)
  }
  mapAsync<U>(mapper): PrrayPromise<U> {
    return prraypromise(this.then(prray => prray.mapAsync(mapper)))
  }
  filterAsync(func: any): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.filterAsync(func)))
  }
  reduceAsync(func: any, initialValue?: any) {
    return this.then(prray => prray.reduceAsync(func, initialValue))
  }
  reduceRightAsync(func: any, initialValue?: any) {
    return this.then(prray => prray.reduceRightAsync(func, initialValue))
  }
  sortAsync(func?: any): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.sortAsync(func)))
  }
  findAsync(func: any): Promise<T|undefined> {
    return this.then(prray => prray.findAsync(func))
  }
  findIndexAsync(func: any): Promise<number> {
    return this.then(prray => prray.findIndexAsync(func))
  }
  everyAsync(func: any): Promise<boolean> {
    return this.then(prray => prray.everyAsync(func))
  }
  someAsync(func: any): Promise<boolean> {
    return this.then(prray => prray.someAsync(func))
  }
  forEachAsync(func: any) {
    return this.then(prray => prray.forEachAsync(func))
  }
  slice(start?: number, end?: number): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.slice(start, end)))
  }
}

function prraypromise<T>(promise: Promise<Prray<T>>) {
  return new PrrayPromise<T>((resolve, reject) => {
    promise.then(resolve)
    promise.catch(reject)
  })
}

export { PrrayPromise, prraypromise }

const p = new PrrayPromise(() => null)
p.mapAsync
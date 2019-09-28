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
  map<U>(callback): PrrayPromise<U> {
    return prraypromise(this.then(prray => prray.map(callback)))
  }
  filter(callback): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.filter(callback)))
  }
  find(callback): Promise<T> {
    return this.then(prray => prray.find(callback))
  }
  findIndex(callback): Promise<number> {
    return this.then(prray => prray.findIndex(callback))
  }
  every(callback): Promise<boolean> {
    return this.then(prray => prray.every(callback))
  }
  some(callback): Promise<boolean> {
    return this.then(prray => prray.some(callback))
  }
  includes(element: T, fromIndex?: number): Promise<boolean> {
    return this.then(prray => prray.includes(element, fromIndex))
  }
  indexOf(element: T, fromIndex?: number): Promise<number> {
    return this.then(prray => prray.indexOf(element, fromIndex))
  }
  lastIndexOf(element: T, fromIndex?: number): Promise<number> {
    return this.then(prray => {
      fromIndex = fromIndex === undefined ? prray.length - 1 : fromIndex  // fix odd bug
      return prray.lastIndexOf(element, fromIndex)
    })
  }
  join(separator?: string): Promise<string> {
    return this.then(prray => prray.join(separator))
  }
  keys(): Promise<IterableIterator<number>> {
    return this.then(prray => prray.keys())
  }
  values(): Promise<IterableIterator<T>> {
    return this.then(prray => prray.values())
  }
  entries(): Promise<IterableIterator<[number, T]>> {
    return this.then(prray => prray.entries())
  }
  fill(value: T, start?: number, end?: number): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.fill(value, start, end)))
  }
  sort(callback?: (a: T, b: T) => number): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.sort(callback)))
  }
}

function prraypromise<T>(promise: Promise<Prray<T>>) {
  if (promise instanceof PrrayPromise) {
    return promise
  } else {
    return new PrrayPromise<T>((resolve, reject) => {
      promise.then(resolve)
      promise.catch(reject)
    })
  }
}

export { PrrayPromise, prraypromise }

const p = new PrrayPromise(() => null)
p.mapAsync
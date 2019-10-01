import { Prray } from './prray'

class PrrayPromise<T> extends Promise<Prray<T>> {

  constructor(executor: (resolve: (prray: Prray<T>) => any, reject: (err: Error) => any) => any) {
    super(executor)
  }

  mapAsync<U>(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<U> | U): PrrayPromise<U> {
    return prraypromise(this.then(prray => prray.mapAsync(func)))
  }

  filterAsync(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.filterAsync(func)))
  }

  reduceAsync(callback: (accumulator: T, currentValue: T, index: number, array: Prray<T>) => Promise<T>): Promise<T>
  reduceAsync<U>(
    callback: (accumulator: U, currentValue: T, index: number, array: Prray<T>) => Promise<U>,
    initialValue?: U,
  ): Promise<U>
  reduceAsync(
    callback: (accumulator: any, currentValue: T, index: number, array: Prray<T>) => Promise<any>,
    initialValue?: any,
  ): Promise<any> {
    return this.then(prray => prray.reduceAsync(callback, initialValue))
  }

  reduceRightAsync(
    callback: (accumulator: T, currentValue: T, index: number, array: Prray<T>) => Promise<T>,
  ): Promise<T>
  reduceRightAsync<U>(
    callback: (accumulator: U, currentValue: T, index: number, array: Prray<T>) => Promise<U>,
    initialValue?: U,
  ): Promise<U>
  reduceRightAsync(
    callback: (accumulator: any, currentValue: T, index: number, array: Prray<T>) => Promise<any>,
    initialValue?: any,
  ): Promise<any> {
    return this.then(prray => prray.reduceRightAsync(callback, initialValue))
  }

  sortAsync(func?: (a: T, b: T) => Promise<number> | number): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.sortAsync(func)))
  }

  findAsync(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean): Promise<T | undefined> {
    return this.then(prray => prray.findAsync(func))
  }

  findIndexAsync(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean): Promise<number> {
    return this.then(prray => prray.findIndexAsync(func))
  }

  everyAsync(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean): Promise<boolean> {
    return this.then(prray => prray.everyAsync(func))
  }

  someAsync(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean): Promise<boolean> {
    return this.then(prray => prray.someAsync(func))
  }

  forEachAsync(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<any> | any) {
    return this.then(prray => prray.forEachAsync(func))
  }

  slice(start?: number, end?: number): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.slice(start, end)))
  }

  map<U>(func: (currentValue: T, index: number, prray: Prray<T>) => U): PrrayPromise<U> {
    return prraypromise(this.then(prray => prray.map(func)))
  }

  filter(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.filter(func)))
  }

  find(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): Promise<T> {
    return this.then(prray => prray.find(func))
  }

  findIndex(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): Promise<number> {
    return this.then(prray => prray.findIndex(func))
  }

  every(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): Promise<boolean> {
    return this.then(prray => prray.every(func))
  }

  some(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): Promise<boolean> {
    return this.then(prray => prray.some(func))
  }

  includes(element: T, fromIndex?: number): Promise<boolean> {
    return this.then(prray => prray.includes(element, fromIndex))
  }

  indexOf(element: T, fromIndex?: number): Promise<number> {
    return this.then(prray => prray.indexOf(element, fromIndex))
  }

  lastIndexOf(element: T, fromIndex?: number): Promise<number> {
    return this.then(prray => {
      fromIndex = fromIndex === undefined ? prray.length - 1 : fromIndex // fix odd bug
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

  sort(func?: (a: T, b: T) => number): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.sort(func)))
  }

  concat(...items: ConcatArray<T>[]): PrrayPromise<T>
  concat(...items: (ConcatArray<T> | T)[]): PrrayPromise<T>
  concat(...items: any[]): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.concat(...items)))
  }

  copyWithin(target: number, start?: number, end?: number) {
    return prraypromise(this.then(prray => prray.copyWithin(target, start, end)))
  }

  toString(): Promise<string> {
    return this.then(prray => prray.toString())
  }

  toLocaleString(): Promise<string> {
    return this.then(prray => prray.toLocaleString())
  }

  forEach(callback: (currentValue: T, index: number, prray: Prray<T>) => any): Promise<void> {
    return this.then(prray => prray.forEach(callback))
  }

  pop(): Promise<T> {
    return this.then(prray => prray.pop())
  }

  push(...items: T[]): Promise<number> {
    return this.then(prray => prray.push(...items))
  }

  reverse(): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.reverse()))
  }

  reduce(callback: (accumulator: T, currentValue: T, index: number, array: Prray<T>) => T): Promise<T>
  reduce<U>(
    callback: (accumulator: U, currentValue: T, index: number, array: Prray<T>) => U,
    initialValue?: U,
  ): Promise<U>
  reduce(
    callback: (accumulator: any, currentValue: T, index: number, array: Prray<T>) => any,
    initialValue?: any,
  ): Promise<any> {
    // Why? If pass parameter initialValue as undefined, the initial value will be undefined instead array[0] actually :(
    return this.then(prray => (arguments.length >= 2 ? prray.reduce(callback, initialValue) : prray.reduce(callback)))
  }

  reduceRight(callback: (accumulator: T, currentValue: T, index: number, array: Prray<T>) => T): Promise<T>
  reduceRight<U>(
    callback: (accumulator: U, currentValue: T, index: number, array: Prray<T>) => U,
    initialValue?: U,
  ): Promise<U>
  reduceRight(
    callback: (accumulator: any, currentValue: T, index: number, array: Prray<T>) => any,
    initialValue?: any,
  ): Promise<any> {
    // Why? If pass parameter initialValue as undefined, the initial value will be undefined instead array[0] actually :(
    return this.then(prray =>
      arguments.length >= 2 ? prray.reduceRight(callback, initialValue) : prray.reduceRight(callback),
    )
  }

  shift(): Promise<T> {
    return this.then(prray => prray.shift())
  }

  unshift(...items: T[]): Promise<number> {
    return this.then(prray => prray.unshift(...items))
  }

  splice(start: number, deleteCount?: number, ...items: T[]): PrrayPromise<T> {
    // Why? If pass parameter deleteCount as undefined directly, the delete count will be zero actually :(
    return prraypromise(
      this.then(prray => (arguments.length >= 2 ? prray.splice(start, deleteCount, ...items) : prray.splice(start))),
    )
  }

  toArray(): Promise<T[]> {
    return this.then(prray => prray.toArray())
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

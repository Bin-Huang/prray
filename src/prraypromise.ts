import { Prray } from './prray'

export class PrrayPromise<T> extends Promise<Prray<T>> {
  constructor(executor: (resolve: (prray: Prray<T>) => any, reject: (err: Error) => any) => any) {
    super(executor)
  }

  mapAsync<U>(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<U> | U): PrrayPromise<U> {
    return prraypromise(this.then(prray => prray.mapAsync(func)))
  }

  map<U>(func: (currentValue: T, index: number, prray: Prray<T>) => U): PrrayPromise<U> {
    return prraypromise(this.then(prray => prray.map(func)))
  }

  filterAsync(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.filterAsync(func)))
  }

  filter(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.filter(func)))
  }

  reduceAsync(func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T | Promise<T>): Promise<T>
  reduceAsync(
    func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T | Promise<T>,
    initialValue: T,
  ): Promise<T>
  reduceAsync<U>(
    func: (accumulator: U, currentValue: T, index: number, prray: Prray<T>) => U | Promise<U>,
    initialValue: U,
  ): Promise<U>
  reduceAsync(
    func: (accumulator: any, currentValue: T, index: number, prray: Prray<T>) => any | Promise<any>,
    initialValue?: any,
  ): Promise<any> {
    const promise = this.then(prray => prray.reduceAsync(func, initialValue))
    return promise
  }

  reduce(func: (accumulator: T, currentValue: T, index: number, array: Prray<T>) => T): T
  reduce(func: (accumulator: T, currentValue: T, index: number, array: Prray<T>) => T, initialValue: T): T
  reduce<U>(func: (accumulator: U, currentValue: T, index: number, array: Prray<T>) => U, initialValue: U): U
  reduce(func: (accumulator: any, currentValue: T, index: number, array: Prray<T>) => any, initialValue?: any): any {
    // Why? If pass parameter initialValue as undefined, the initial value will be undefined instead array[0] actually :(
    return this.then(prray => (arguments.length >= 2 ? prray.reduce(func, initialValue) : prray.reduce(func)))
  }

  reduceRightAsync(
    func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T | Promise<T>,
  ): Promise<T>
  reduceRightAsync(
    func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T | Promise<T>,
    initialValue: T,
  ): Promise<T>
  reduceRightAsync<U>(
    func: (accumulator: U, currentValue: T, index: number, prray: Prray<T>) => U | Promise<U>,
    initialValue: U,
  ): Promise<U>
  reduceRightAsync(
    func: (accumulator: any, currentValue: T, index: number, prray: Prray<T>) => any | Promise<any>,
    initialValue?: any,
  ): Promise<any> {
    return this.then(prray => prray.reduceRightAsync(func, initialValue))
  }

  reduceRight(func: (accumulator: T, currentValue: T, index: number, array: Prray<T>) => T): T
  reduceRight(func: (accumulator: T, currentValue: T, index: number, array: Prray<T>) => T, initialValue: T): T
  reduceRight<U>(func: (accumulator: U, currentValue: T, index: number, array: Prray<T>) => U, initialValue: U): U
  reduceRight(
    func: (accumulator: any, currentValue: T, index: number, array: Prray<T>) => any,
    initialValue?: any,
  ): any {
    // Why? If pass parameter initialValue as undefined, the initial value will be undefined instead array[0] actually :(
    return this.then(prray => (arguments.length >= 2 ? prray.reduceRight(func, initialValue) : prray.reduceRight(func)))
  }

  sortAsync(func?: (a: T, b: T) => Promise<number> | number): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.sortAsync(func)))
  }

  findAsync(
    func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean,
  ): Promise<T | undefined> {
    return this.then(prray => prray.findAsync(func))
  }

  find(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): Promise<T | undefined> {
    return this.then(prray => prray.find(func))
  }

  findIndexAsync(
    func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean,
  ): Promise<number> {
    return this.then(prray => prray.findIndexAsync(func))
  }

  findIndex(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): Promise<number> {
    return this.then(prray => prray.findIndex(func))
  }

  everyAsync(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean): Promise<boolean> {
    return this.then(prray => prray.everyAsync(func))
  }

  every(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): Promise<boolean> {
    return this.then(prray => prray.every(func))
  }

  someAsync(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean): Promise<boolean> {
    return this.then(prray => prray.someAsync(func))
  }

  some(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): Promise<boolean> {
    return this.then(prray => prray.some(func))
  }

  forEachAsync(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<any> | any): Promise<undefined> {
    return this.then(prray => prray.forEachAsync(func))
  }

  forEach(func: (currentValue: T, index: number, prray: Prray<T>) => any): Promise<undefined> {
    return this.then(prray => prray.forEach(func))
  }

  slice(start?: number, end?: number): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.slice(start, end)))
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

  copyWithin(target: number, start: number, end?: number) {
    return prraypromise(this.then(prray => prray.copyWithin(target, start, end)))
  }

  toString(): Promise<string> {
    return this.then(prray => prray.toString())
  }

  toLocaleString(): Promise<string> {
    return this.then(prray => prray.toLocaleString())
  }

  pop(): Promise<T | undefined> {
    return this.then(prray => prray.pop())
  }

  push(...items: T[]): Promise<number> {
    return this.then(prray => prray.push(...items))
  }

  reverse(): PrrayPromise<T> {
    return prraypromise(this.then(prray => prray.reverse()))
  }

  shift(): Promise<T | undefined> {
    return this.then(prray => prray.shift())
  }

  unshift(...items: T[]): Promise<number> {
    return this.then(prray => prray.unshift(...items))
  }

  splice(start: number): PrrayPromise<T>
  splice(start: number, deleteCount: number): PrrayPromise<T>
  splice(start: number, deleteCount: number, ...items: T[]): PrrayPromise<T>
  splice(start: number, deleteCount?: number, ...items: T[]): PrrayPromise<T> {
    // Why? If pass parameter deleteCount as undefined directly, the delete count will be zero actually :(
    const promise = this.then(prray =>
      deleteCount === undefined ? prray.splice(start) : prray.splice(start, deleteCount, ...items),
    )
    return prraypromise(promise)
  }

  toArray(): Promise<T[]> {
    return this.then(prray => prray.toArray())
  }
}

export function prraypromise<T>(promise: Promise<Prray<T>>): PrrayPromise<T> {
  if (promise instanceof PrrayPromise) {
    return promise
  } else {
    return new PrrayPromise<T>((resolve, reject) => {
      promise.then(resolve)
      promise.catch(reject)
    })
  }
}

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
  reduceAsync(callback: (accumulator: T, currentValue: T, index: number, array: Prray<T>) => Promise<T>): Promise<T>
  reduceAsync<U>(callback: (accumulator: U, currentValue: T, index: number, array: Prray<T>) => Promise<U>, initialValue?: U): Promise<U>
  reduceAsync(callback: (accumulator: any, currentValue: T, index: number, array: Prray<T>) => Promise<any>, initialValue?: any): Promise<any> {
    return this.then(prray => prray.reduceAsync(callback, initialValue))
  }
  reduceRightAsync(callback: (accumulator: T, currentValue: T, index: number, array: Prray<T>) => Promise<T>): Promise<T>
  reduceRightAsync<U>(callback: (accumulator: U, currentValue: T, index: number, array: Prray<T>) => Promise<U>, initialValue?: U): Promise<U>
  reduceRightAsync(callback: (accumulator: any, currentValue: T, index: number, array: Prray<T>) => Promise<any>, initialValue?: any): Promise<any> {
    return this.then(prray => prray.reduceRightAsync(callback, initialValue))
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
  reduce<U>(callback: (accumulator: U, currentValue: T, index: number, array: Prray<T>) => U, initialValue?: U): Promise<U>
  reduce(callback: (accumulator: any, currentValue: T, index: number, array: Prray<T>) => any, initialValue?: any): Promise<any> {
    // Why? If pass parameter initialValue as undefined, the initial value will be undefined instead array[0] actually :(
    return this.then(prray => 
      arguments.length >= 2
        ? prray.reduce(callback, initialValue)
        : prray.reduce(callback)
    )
  }
  reduceRight(callback: (accumulator: T, currentValue: T, index: number, array: Prray<T>) => T): Promise<T>
  reduceRight<U>(callback: (accumulator: U, currentValue: T, index: number, array: Prray<T>) => U, initialValue?: U): Promise<U>
  reduceRight(callback: (accumulator: any, currentValue: T, index: number, array: Prray<T>) => any, initialValue?: any): Promise<any> {
    // Why? If pass parameter initialValue as undefined, the initial value will be undefined instead array[0] actually :(
    return this.then(prray => 
      arguments.length >= 2
        ? prray.reduceRight(callback, initialValue)
        : prray.reduceRight(callback)
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
    return prraypromise(this.then(prray => 
      arguments.length >= 2
        ? prray.splice(start, deleteCount, ...items)
        : prray.splice(start)
    ))
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

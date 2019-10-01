import { prraypromise, PrrayPromise } from './prraypromise'
import * as methods from './methods'

// TODO: Mutable and Immutable
// TODO: thisArg

export class Prray<T> extends Array<T> {
  static of<T>(...args: T[]): Prray<T> {
    return Prray.from(args)
  }

  static isPrray(obj: any): boolean {
    return obj instanceof Prray
  }

  static from<T, U>(arrayLike: Iterable<T> | ArrayLike<T>): Prray<T>
  static from<T, U>(arrayLike: Iterable<T> | ArrayLike<T>, mapFunc: (v: T, ix: number) => U, thisArg?: any): Prray<U>
  static from<T, U>(
    arrayLike: Iterable<T> | ArrayLike<T>,
    mapFunc?: (v: T, ix: number) => U,
    thisArg?: any,
  ): Prray<any> {
    const arr =
      arrayLike instanceof Array && mapFunc === undefined ? arrayLike : super.from(arrayLike, mapFunc, thisArg)
    const prr = new Prray<T>()
    for (let i = arr.length - 1; i >= 0; i--) {
      prr[i] = arr[i]
    }
    return prr
  }

  constructor(length: number)
  constructor(...args: T[])
  constructor(...args: any[]) {
    super(...args)
  }

  mapAsync<U>(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<U> | U): PrrayPromise<U> {
    const promise = methods.map(this, func)
    return prraypromise(promise.then(arr => Prray.from(arr)))
  }

  filterAsync(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean): PrrayPromise<T> {
    const promise = methods.filter(this, func)
    return prraypromise(promise.then(arr => Prray.from(arr)))
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
    return methods.reduce(this, callback, initialValue)
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
    return methods.reduceRight(this, callback, initialValue)
  }

  sortAsync(func?: (a: T, b: T) => Promise<number> | number): PrrayPromise<T> {
    const promise = methods.sort(this, func)
    return prraypromise(promise.then(arr => Prray.from(arr)))
  }

  findAsync(
    func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean,
  ): Promise<T | undefined> {
    return methods.find(this, func)
  }

  findIndexAsync(
    func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean,
  ): Promise<number> {
    return methods.findIndex(this, func)
  }

  everyAsync(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean): Promise<boolean> {
    return methods.every(this, func)
  }

  someAsync(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean): Promise<boolean> {
    return methods.some(this, func)
  }

  forEachAsync(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<any> | any) {
    return methods.forEach(this, func)
  }

  slice(start?: number, end?: number): Prray<T> {
    const result: T[] = super.slice(start, end)
    return _ensurePrray(result)
  }

  map<U>(func: (currentValue: T, index: number, prray: Prray<T>) => U): Prray<U> {
    return _ensurePrray(super.map(func))
  }

  filter(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): Prray<T> {
    return _ensurePrray(super.filter(func))
  }

  concat(...items: ConcatArray<T>[]): Prray<T>
  concat(...items: (ConcatArray<T> | T)[]): Prray<T>
  concat(...items: any[]): Prray<T> {
    return _ensurePrray(super.concat(...items))
  }

  reverse(): Prray<T> {
    return super.reverse() as Prray<T>
  }

  splice(start: number, deleteCount?: number, ...items: T[]): Prray<T> {
    // Why? If pass parameter deleteCount as undefined directly, the delete count will be zero actually :(
    const result = arguments.length >= 2 ? super.splice(start, deleteCount, ...items) : super.splice(start)
    return _ensurePrray(result)
  }

  toArray(): T[] {
    return [...this]
  }
}

export function prray<T>(arr: T[]): Prray<T> {
  return Prray.from(arr)
}

export function _ensurePrray<T>(arr: T[]): Prray<T> {
  if (arr instanceof Prray) {
    return arr
  } else {
    return Prray.from(arr)
  }
}

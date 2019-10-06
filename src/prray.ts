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

  static from<T>(arrayLike: Iterable<T> | ArrayLike<T>): Prray<T>
  static from<T, U>(arrayLike: Iterable<T> | ArrayLike<T>, mapFunc: (v: T, ix: number) => U, thisArg?: any): Prray<U>
  static from<T, U>(
    arrayLike: Iterable<T> | ArrayLike<T>,
    mapFunc?: (v: T, ix: number) => U,
    thisArg?: any,
  ): Prray<any> {
    const arr = mapFunc === undefined ? super.from(arrayLike) : super.from(arrayLike, mapFunc, thisArg)
    const prr = new Prray()
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

  mapAsync<U>(
    func: (currentValue: T, index: number, prray: Prray<T>) => Promise<U> | U,
    opts?: { concurrency: number },
  ): PrrayPromise<U> {
    const promise = methods.mapAsync(this, func, opts)
    return prraypromise(promise.then(arr => Prray.from(arr)))
  }

  map<U>(func: (currentValue: T, index: number, prray: Prray<T>) => U): Prray<U> {
    return _ensurePrray(methods.map(this, func))
  }

  filterAsync(
    func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean,
    opts?: { concurrency: number },
  ): PrrayPromise<T> {
    const promise = methods.filterAsync(this, func, opts)
    return prraypromise(promise.then(arr => Prray.from(arr)))
  }

  filter(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): Prray<T> {
    return _ensurePrray(methods.filter(this, func))
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
    const promise = methods.reduceAsync(this, func, initialValue)
    return promise
  }

  reduce(func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T): T
  reduce(func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T, initialValue: T): T
  reduce<U>(func: (accumulator: U, currentValue: T, index: number, prray: Prray<T>) => U, initialValue: U): U
  reduce(func: (accumulator: any, currentValue: T, index: number, prray: Prray<T>) => any, initialValue?: any): any {
    return methods.reduce(this, func, initialValue)
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
    const promise = methods.reduceRightAsync(this, func, initialValue)
    return promise
  }

  reduceRight(func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T): T
  reduceRight(func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T, initialValue: T): T
  reduceRight<U>(func: (accumulator: U, currentValue: T, index: number, prray: Prray<T>) => U, initialValue: U): U
  reduceRight(
    func: (accumulator: any, currentValue: T, index: number, prray: Prray<T>) => any,
    initialValue?: any,
  ): any {
    return methods.reduceRight(this, func, initialValue)
  }

  sortAsync(func?: (a: T, b: T) => Promise<number> | number): PrrayPromise<T> {
    const promise = methods.sortAsync(this, func)
    return prraypromise(promise)
  }

  findAsync(
    func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean,
  ): Promise<T | undefined> {
    return methods.findAsync(this, func)
  }

  find(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): T | undefined {
    return methods.find(this, func)
  }

  findIndexAsync(
    func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean,
  ): Promise<number> {
    return methods.findIndexAsync(this, func)
  }

  findIndex(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): number {
    return methods.findIndex(this, func)
  }

  everyAsync(
    func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean,
    opts?: { concurrency: number },
  ): Promise<boolean> {
    return methods.everyAsync(this, func, opts)
  }

  every(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): boolean {
    return methods.every(this, func)
  }

  someAsync(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean): Promise<boolean> {
    return methods.someAsync(this, func)
  }

  some(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): boolean {
    return methods.some(this, func)
  }

  forEachAsync(func: (currentValue: T, index: number, prray: Prray<T>) => Promise<any> | any): Promise<undefined> {
    return methods.forEachAsync(this, func)
  }

  forEach(func: (currentValue: T, index: number, prray: Prray<T>) => any): undefined {
    return methods.forEach(this, func)
  }

  slice(start?: number, end?: number): Prray<T> {
    const result: T[] = super.slice(start, end)
    return _ensurePrray(result)
  }

  concat(...items: ConcatArray<T>[]): Prray<T>
  concat(...items: (ConcatArray<T> | T)[]): Prray<T>
  concat(...items: any[]): Prray<T> {
    return _ensurePrray(super.concat(...items))
  }

  reverse(): Prray<T> {
    return super.reverse() as Prray<T>
  }

  splice(start: number): Prray<T>
  splice(start: number, deleteCount: number): Prray<T>
  splice(start: number, deleteCount: number, ...items: T[]): Prray<T>
  splice(start: number, deleteCount?: number, ...items: T[]): Prray<T> {
    // Why? If pass parameter deleteCount as undefined directly, the delete count will be zero actually :(
    const result = deleteCount === undefined ? super.splice(start) : super.splice(start, deleteCount, ...items)
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

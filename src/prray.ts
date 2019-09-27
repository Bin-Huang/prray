import { prraypromise, PrrayPromise } from './prraypromise'
import * as methods from './methods'
import { IMapCallback, ITester, IReduceCallback } from './types'

// TODO: Update method types

// TODO: Prray.from, Prray.isArray, Prray.isPrray
// TODO: thisArg

class Prray<T> extends Array {

  static from<T,U>(arrayLike: Iterable<T> | ArrayLike<T>): Prray<T>
  static from<T,U>(arrayLike: Iterable<T> | ArrayLike<T>, mapFunc: (v: T, ix: number) => U, thisArg?: any): Prray<U>
  static from<T,U>(arrayLike: Iterable<T> | ArrayLike<T>, mapFunc?: (v: T, ix: number) => U, thisArg?: any): Prray<any> {
    const arr = arrayLike instanceof Array && mapFunc === undefined
      ? arrayLike
      : super.from(arrayLike, mapFunc, thisArg)
    const prr = new Prray<T>()
    for (let i = arr.length - 1; i >= 0; i --) {
      prr[i] = arr[i]
    }
    return prr
  }

  static of<T>(...args: T[]): Prray<T> {
    return Prray.from(args)
  }

  constructor(...args: any[]) {
    super(...args)
  }
  mapAsync<U>(mapper: IMapCallback<T, U>): PrrayPromise<U> {
    const promise = methods.map(this, mapper)
    return prraypromise(promise.then((arr) => Prray.from(arr)))
  }
  filterAsync(func: ITester<T>): PrrayPromise<T> {
    const promise = methods.filter(this, func)
    return prraypromise(promise.then((arr) => Prray.from(arr)))
  }
  reduceAsync<U>(func: IReduceCallback<T, U>, initialValue?: U): Promise<U> {
    return methods.reduce(this, func, initialValue)
  }
  reduceRightAsync<U>(func: IReduceCallback<T, U>, initialValue?: U): Promise<U> {
    return methods.reduceRight(this, func, initialValue)
  }
  sortAsync(func?: any): PrrayPromise<T> {
    const promise = methods.sort(this, func)
    return prraypromise(promise.then((arr) => Prray.from(arr)))
  }
  findAsync(func: ITester<T>): Promise<T> {
    return methods.find(this, func)
  }
  findIndexAsync(func: ITester<T>): Promise<number> {
    return methods.findIndex(this, func)
  }
  everyAsync(func: ITester<T>): Promise<boolean> {
    return methods.every(this, func)
  }
  someAsync(func: ITester<T>): Promise<boolean> {
    return methods.some(this, func)
  }
  forEachAsync<U>(func: IMapCallback<T, U>) {
    return methods.forEach(this, func)
  }
  slice(start?: number, end?: number): Prray<T> {
    const result: T[] = super.slice(start, end)
    if (result instanceof Prray) {
      return result
    } else {
      return Prray.from(result)
    }
  }
}

function prray<T>(arr: T[]): Prray<T> {
  return Prray.from(arr)
}

export { Prray, prray }

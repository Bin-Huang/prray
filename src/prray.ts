import { prraypromise, PrrayPromise } from './prraypromise'
import * as methods from './methods'
import { IMapCallback, ITester, IReduceCallback } from './types'

// TODO: Update method types

class Prray<T> extends Array {
  constructor(...args: any[]) {
    super(...args)
  }
  mapAsync<U>(mapper: IMapCallback<T, U>): PrrayPromise<U> {
    const promise = methods.map(this, mapper)
    return prraypromise(promise.then(prray))
  }
  filterAsync(func: ITester<T>): PrrayPromise<T> {
    const promise = methods.filter(this, func)
    return prraypromise(promise.then(prray))
  }
  reduceAsync<U>(func: IReduceCallback<T, U>, initialValue?: U): Promise<U> {
    return methods.reduce(this, func, initialValue)
  }
  reduceRightAsync<U>(func: IReduceCallback<T, U>, initialValue?: U): Promise<U> {
    return methods.reduceRight(this, func, initialValue)
  }
  sortAsync(func?: any): PrrayPromise<T> {
    const promise = methods.sort(this, func)
    return prraypromise(promise.then(prray))
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
      return prray(result)
    }
  }
}

function prray<T>(arr: T[]): Prray<T> {
  if (arr.length === 1) {
    const prr = new Prray<T>()
    prr[0] = arr[0]
    return prr
  } else {
    return new Prray(...arr)
  }
}

export { Prray, prray }

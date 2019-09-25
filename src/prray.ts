import { prraypromise, setPrrayConvertor, PrrayPromise } from './prraypromise'
import * as methods from './methods'
import { IMapCallback, ITester, IReduceCallback } from './types'

class Prray<T> extends Array {
  constructor(...args: any[]) {
    super(...args)
  }
  mapAsync<U>(mapper: IMapCallback<T, U>): PrrayPromise<U> {
    const promise = methods.map(this, mapper)
    return prraypromise(promise.then(result => prray(result)))
  }
  filterAsync(func: ITester<T>): PrrayPromise<T> {
    const promise = methods.filter(this, func)
    return prraypromise(promise.then(result => prray(result)))
  }
  reduceAsync<U>(func: IReduceCallback<T, U>, initialValue?: U): Promise<U> {
    return methods.reduce(this, func, initialValue)
  }
  reduceRightAsync(func: any, initialValue?: any) {
    return methods.reduceRight(this, func, initialValue)
  }
  sortAsync(func?: any) {
    const promise = methods.sort(this, func)
    return prraypromise(promise)
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
  slice(start?: number, end?: number) {
    // 虽然原生 slice 也可以返回 Prray，但为了兼容其他环境(比如其他浏览器实现)，因此覆盖
    const result = methods.slice(this, start, end)
    return prray(result)
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

setPrrayConvertor(prray)

export { Prray, prray }

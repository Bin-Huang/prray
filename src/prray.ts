import { prraypromise, PrrayPromise } from './prraypromise'

export class Prray<T> extends Array<T> {
  constructor(...arg: T[]) {
    super(...arg)
  }
  mapAsync<U>(mapper: any, concurrency?: number): PrrayPromise<U> {
    return prraypromise(Promise.resolve(this)).map(mapper, concurrency)
  }
  filterAsync(filterer: any, concurrency?: number): PrrayPromise<T> {
    return prraypromise(Promise.resolve(this)).filter(filterer, concurrency)
  }
  reduceAsync<U>(reducer: any, initialValue: U): Promise<U> {
    return prraypromise(Promise.resolve(this)).reduce(reducer, initialValue)
  }
  everyAsync(tester: any, concurrency?: number): Promise<boolean> {
    return prraypromise(Promise.resolve(this)).every(tester, concurrency)
  }
  someAsync(tester: any, concurrency?: number): Promise<boolean> {
    return prraypromise(Promise.resolve(this)).some(tester, concurrency)
  }
  find(tester: any, concurrency?: number): Promise<T | null> {
    return prraypromise(Promise.resolve(this)).find(tester, concurrency)
  }
  findIndex(tester: any, concurrency?: number): Promise<number> {
    return prraypromise(Promise.resolve(this)).findIndex(tester, concurrency)
  }
  toArray() {
    return [...this]
  }
}

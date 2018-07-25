import { PPromise, ppromise } from './ppromise'
import pMap from 'p-map'
import pFilter from 'p-filter'
import pReduce from 'p-reduce'

export interface PrrayPromise<T> extends PPromise<T[]> {
  mapAsync<U> (mapper: IMapper<T, U>): PrrayPromise<U>
  filterAsync(filterer: IFilterer<T>): PrrayPromise<T>
  reduceAsync<S>(reducer: IReducer<T, S>, initialValue: S): PPromise<S>
  toArray(): Promise<T[]>
}

const methods = { mapAsync, filterAsync, reduceAsync, toArray }

export function prraypromise<T>(promise: Promise<T[]>): PrrayPromise<T> {
  for (const method in methods) {
    (promise as any)[method] = (methods as any)[method]
  }
  return promise as any
}

export type IMapper<T, U> = (item: T, index: number) => U | Promise<U>
export type IFilterer<T> = (item: T, index: number) => boolean | Promise<boolean>
export type IReducer<T,U> = (pre: U, current: T, index: number) => U | Promise<U>
export type ITester<T> = (item: T) => boolean

export function mapAsync<T, U>(this: PrrayPromise<T>, mapper: IMapper<T, U>): PrrayPromise<U> {
  const prom = this.then((r) => pMap(r, mapper))
  return prraypromise(prom)
}

export function filterAsync<T>(this: PrrayPromise<T>, filterer: IFilterer<T>): PrrayPromise<T> {
  const prom = this.then((r) => pFilter(r, filterer))
  return prraypromise(prom)
}

export function toArray<T>(this: PrrayPromise<T>): Promise<T[]> {
  return this.then((r) => [...r])
}

export function reduceAsync<T, S>(
  this: PrrayPromise<T>,
  reducer: IReducer<T, S>,
  initialValue: S,  // TODO: 当不赋予 init 的值，将计算出错（p-reduce的问题）
): PPromise<S> {
  const prom = this.then((r) => pReduce(r, reducer, initialValue))
  return ppromise(prom)// TODO: 如果是 array，考虑返回 prraypromise
}

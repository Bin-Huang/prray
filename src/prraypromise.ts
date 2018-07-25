import { PPromise } from './ppromise'
import { Prray } from './prray'
import pMap from 'p-map'
import pFilter from 'p-filter'

export interface PrrayPromise<T> extends PPromise<T> {
  mapAsync<U> (mapper: IMapper<T, U>): PrrayPromise<U>
  filterAsync(filterer: IFilterer<T>): PrrayPromise<T>
}

const methods = { mapAsync, filterAsync }

export function prraypromise<T>(promise: Promise<T>): PrrayPromise<T> {
  for (const method in methods) {
    (promise as any)[method] = (methods as any)[method]
  }
  return promise as PrrayPromise<T>
}

export type IMapper<T, U> = (item: T, index: number) => U | Promise<U>
export type IFilterer<T> = (item: T, index: number) => boolean
export type IReducer<T,U> = (pre: U, current: T, index: number) => U
export type ITester<T> = (item: T) => boolean

export function mapAsync<T, U>(this: PrrayPromise<T>, mapper: IMapper<T, U>): PrrayPromise<U> {
  const prom = this.then((r) => pMap(r, mapper))
  return prraypromise(prom)
}

export function filterAsync<T>(this: PrrayPromise<T>, filterer: IFilterer<T>): Promise<Prray<T>> {
  const prom = this.then((r) => pFilter(r, filterer))
  return prraypromise(prom)
}

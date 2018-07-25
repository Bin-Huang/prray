import { PPromise } from './ppromise'
import { Prray } from './prray'
import pMap from 'p-map'

export interface PrrayPromise<T> extends PPromise<T> {
  mapAsync: (v: any) => any
}

const methods = { mapAsync }

export function prraypromise<T>(promise: Promise<T>): PrrayPromise<T> {
  for (const method in methods) {
    (promise as any)[method] = (methods as any)[method]
  }
  return promise as PrrayPromise<T>
}

type IMapper<T, U> = (item: T, index: number) => U
type IFilterer<T> = (item: T, index: number) => boolean
type IReducer<T,U> = (pre: U, current: T, index: number) => U
type ITester<T> = (item: T) => boolean

export function mapAsync<T, U>(this: PrrayPromise<T> | Prray<T>, mapper: IMapper<T, U>): PrrayPromise<U> {
  const prom = this.then((r) => pMap(r, mapper))
  return prraypromise(prom)
}
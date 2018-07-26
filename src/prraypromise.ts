import { PPromise, ppromise } from './ppromise'
import pMap from 'p-map'
import pFilter from 'p-filter'
import pReduce from 'p-reduce'

export interface PrrayPromise<T> extends PPromise<T[]> {
  mapAsync: IMapAsync
  filterAsync: IFilterAsync
  reduceAsync: IReduceAsync
  toArray: IToArray
}

export type ITester<T> = (item: T) => boolean

export type IMapper<T, U> = (item: T, index: number) => U | Promise<U>
export interface IMapAsync {
  <T, U>(this: PrrayPromise<T>, mapper: IMapper<T, U>): PrrayPromise<U> 
}
const mapAsync: IMapAsync = function (mapper) {
  const prom = this.then((r) => pMap(r, mapper))
  return prraypromise(prom)
}

export type IFilterer<T> = (item: T, index: number) => boolean | Promise<boolean>
export interface IFilterAsync {
  <T>(this: PrrayPromise<T>, filterer: IFilterer<T>): PrrayPromise<T> 
}
const filterAsync: IFilterAsync = function (filterer) {
  const prom = this.then((r) => pFilter(r, filterer))
  return prraypromise(prom)
}

export type IReducer<T,U> = (pre: U, current: T, index: number) => U | Promise<U>
export interface IReduceAsync {
  // TODO: 当不赋予 init 的值，将计算出错（p-reduce的问题）
  <T, S>(this: PrrayPromise<T>, reducer: IReducer<T, S>, initialValue: S): PPromise<S> 
}

const reduceAsync: IReduceAsync = function (reducer, initialValue) {
  const prom = this.then((r) => pReduce(r, reducer, initialValue))
  return ppromise(prom)// TODO: 如果是 array，考虑返回 prraypromise
}

export type IToArray = <T>(this: PrrayPromise<T>) => Promise<T[]>
const toArray: IToArray = function() {
  return this.then((r) => [...r])
}
const methods = { mapAsync, filterAsync, reduceAsync, toArray }

export function prraypromise<T>(promise: Promise<T[]>): PrrayPromise<T> {
  for (const method in methods) {
    (promise as any)[method] = (methods as any)[method]
  }
  return promise as any
}

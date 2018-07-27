import { PPromise, ppromise } from './ppromise'
import pMap from 'p-map'
import pFilter from 'p-filter'
import pReduce from 'p-reduce'
import pEvery from 'p-every'

export interface PrrayPromise<T> extends PPromise<T[]> {
  mapAsync: IMapAsync
  filterAsync: IFilterAsync
  reduceAsync: IReduceAsync
  toArray: IToArray
  everyAsync: IEveryAsync
  someAsync: ISomeAsync
}

export type IMapper<T, U> = (item: T, index: number) => U | Promise<U>
export interface IMapAsync {
  <T, U>(this: PrrayPromise<T>, mapper: IMapper<T, U>, concurrency?: number): PrrayPromise<U> 
}
const mapAsync: IMapAsync = function (mapper, concurrency) {
  const prom = this.then((r) => concurrency ? pMap(r, mapper, {concurrency}) : pMap(r, mapper))
  return prraypromise(prom)
}

export type ITester<T> = (item: T, index: number) => boolean | Promise<boolean>
export interface IFilterAsync {
  <T>(this: PrrayPromise<T>, tester: ITester<T>, concurrency?: number): PrrayPromise<T> 
}
const filterAsync: IFilterAsync = function (filterer, concurrency) {
  const prom = this.then((r) => concurrency ? pFilter(r, filterer, {concurrency}) : pFilter(r, filterer))
  return prraypromise(prom)
}

export type IReducer<T,U> = (pre: U, current: T, index: number) => U | Promise<U>
export interface IReduceAsync {
  // TODO: 当不赋予 init 的值，将计算出错（p-reduce的问题）
  <T, S>(this: PrrayPromise<T>, reducer: IReducer<T, S>, initialValue: S, concurrency?: number): PPromise<S> 
}

const reduceAsync: IReduceAsync = function (reducer, initialValue, concurrency) {
  const prom = this.then((r) => concurrency ? pReduce(r, reducer, initialValue, {concurrency}) : pReduce(r, reducer, initialValue))
  return ppromise(prom)// TODO: 如果是 array，考虑返回 prraypromise
}

export interface IEveryAsync {
  <T>(this: PrrayPromise<T>, tester: ITester<T>, concurrency?: number): Promise<boolean> 
}
const everyAsync: IEveryAsync = function (tester, concurrency) {
  return this.then((r) => concurrency ? pEvery(r, tester, {concurrency}) : pEvery(r, tester))
}

export interface ISomeAsync {
  <T>(this: PrrayPromise<T>, tester: ITester<T>, concurrency?: number): Promise<boolean> 
}
const someAsync: ISomeAsync = function (tester, concurrency) {
  const negate = async (item, ix) => !(await tester(item, ix))
  return this.then((r) => concurrency ? pEvery(r, negate, {concurrency}) : pEvery(r, negate)).then(r => !r)
}

export type IToArray = <T>(this: PrrayPromise<T>) => Promise<T[]>
const toArray: IToArray = function() {
  return this.then((r) => [...r])
}
const methods = { mapAsync, filterAsync, reduceAsync, toArray, everyAsync, someAsync }

export function prraypromise<T>(promise: Promise<T[]>): PrrayPromise<T> {
  for (const method in methods) {
    (promise as any)[method] = (methods as any)[method]
  }
  return promise as any
}

import { PPromise, ppromise } from './ppromise'
import pMap from 'p-map'
import pFilter from 'p-filter'
import pReduce from 'p-reduce'
import pEvery from 'p-every'
import { PrrayPromise, prraypromise } from './prraypromise'

export interface IEveryAsync {
  <T>(this: PrrayPromise<T>, tester: ITester<T>, concurrency?: number): Promise<boolean> 
}
export const everyAsync: IEveryAsync = function (tester, concurrency) {
  return this.then((r) => concurrency ? pEvery(r, tester, {concurrency}) : pEvery(r, tester))
}

export interface ISomeAsync {
  <T>(this: PrrayPromise<T>, tester: ITester<T>, concurrency?: number): Promise<boolean> 
}
export const someAsync: ISomeAsync = function (tester, concurrency) {
  const negate = async (item, ix) => !(await tester(item, ix))
  return this.then((r) => concurrency ? pEvery(r, negate, {concurrency}) : pEvery(r, negate)).then(r => !r)
}

class EndError<T> extends Error {
  public ele: T
  public ix: number
	constructor(ele: T, ix: number) {
		super();
    this.ele = ele;
    this.ix = ix
	}
}

export interface IFindAsync {
  <T>(this: PrrayPromise<T>, tester: ITester<T>, concurrency?: number): Promise<T> 
}
function find<T>(datas: T[], tester: (ele: T, ix: number) => boolean | Promise<boolean>, opts?: any): Promise<T> {
  const finder = (ele: T, ix: number) => Promise.resolve(tester(ele, ix)).then((r) => {
    if (r) {
      throw new EndError(ele, ix)
    }
  })
  return pMap(datas, finder, opts).then(() => null).catch((r) => {
    if (r instanceof EndError) {
      return r.ele
    }
  })
}
export const findAsync: IFindAsync = function (tester, concurrency) {
  return this.then((r) => concurrency ? find(r, tester, {concurrency}) : find(r, tester))
}

export type IToArray = <T>(this: PrrayPromise<T>) => Promise<T[]>
export const toArray: IToArray = function() {
  return this.then((r) => [...r])
}

export type IMapper<T, U> = (item: T, index: number) => U | Promise<U>
export interface IMapAsync {
  <T, U>(this: PrrayPromise<T>, mapper: IMapper<T, U>, concurrency?: number): PrrayPromise<U> 
}
export const mapAsync: IMapAsync = function (mapper, concurrency) {
  const prom = this.then((r) => concurrency ? pMap(r, mapper, {concurrency}) : pMap(r, mapper))
  return prraypromise(prom)
}

export type ITester<T> = (item: T, index: number) => boolean | Promise<boolean>
export interface IFilterAsync {
  <T>(this: PrrayPromise<T>, tester: ITester<T>, concurrency?: number): PrrayPromise<T> 
}
export const filterAsync: IFilterAsync = function (filterer, concurrency) {
  const prom = this.then((r) => concurrency ? pFilter(r, filterer, {concurrency}) : pFilter(r, filterer))
  return prraypromise(prom)
}

export type IReducer<T,U> = (pre: U, current: T, index: number) => U | Promise<U>
export interface IReduceAsync {
  // TODO: 当不赋予 init 的值，将计算出错（p-reduce的问题）
  <T, S>(this: PrrayPromise<T>, reducer: IReducer<T, S>, initialValue: S, concurrency?: number): PPromise<S> 
}
export const reduceAsync: IReduceAsync = function (reducer, initialValue, concurrency) {
  const prom = this.then((r) => concurrency ? pReduce(r, reducer, initialValue, {concurrency}) : pReduce(r, reducer, initialValue))
  return ppromise(prom)// TODO: 如果是 array，考虑返回 prraypromise
}

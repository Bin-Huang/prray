import pMap from 'p-map'
import pFilter from 'p-filter'
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
  <T>(this: PrrayPromise<T>, tester: ITester<T>, concurrency?: number): Promise<T | null> 
}
function find<T>(datas: T[], tester: (ele: T, ix: number) => boolean | Promise<boolean>, opts?: any): Promise<{ ele: T, ix: number } | null> {
  const finder = (ele: T, ix: number) => Promise.resolve(tester(ele, ix)).then((r) => {
    if (r) {
      throw new EndError(ele, ix)
    }
  })
  return pMap(datas, finder, opts).then(() => null).catch((r) => {
    if (r instanceof EndError) {
      return r
    }
    return null
  })
}
export const findAsync: IFindAsync = function (tester, concurrency) {
    return this.then((r) => concurrency ? find(r, tester, {concurrency}) : find(r, tester))
        .then((r) => r === null ? null : r.ele)
}

export interface IFindIndexAsync {
  <T>(this: PrrayPromise<T>, tester: ITester<T>, concurrency?: number): Promise<number | -1> 
}
export const findIndexAsync: IFindIndexAsync = function (tester, concurrency) {
    return this.then((r) => concurrency ? find(r, tester, {concurrency}) : find(r, tester))
        .then((r) => r === null ? -1 : r.ix)
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
  <T, S>(this: PrrayPromise<T>, reducer: IReducer<T, S>, initialValue?: S): Promise<S> 
}
async function reduce(datas: any[], reducer, init?) {
  // TODO: Better implementation
  let result
  let slices
  if (init === undefined) {
    result = datas[0]
    slices = datas.slice(1)
  } else {
    result = init
    slices = datas
  }
  for (let ix = 0; ix < slices.length; ix ++) {
    result = await reducer(result, slices[ix], ix)
  }
  return result
}
export const reduceAsync: IReduceAsync = function (reducer, initialValue?) {
  const prom = this.then((r) => reduce(r, reducer, initialValue))
  return prom // TODO: if return promise<array>, returns prraypromise<array>???
}

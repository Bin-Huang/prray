import pMap from 'p-map'
import { PrrayPromise } from '../prraypromise'

class EndError<T> extends Error {
  public ele: T
  public ix: number
	constructor(ele: T, ix: number) {
		super();
    this.ele = ele;
    this.ix = ix
	}
}

function _find<T>(datas: T[], tester: (ele: T, ix: number) => boolean | Promise<boolean>, opts?: any): Promise<{ ele: T, ix: number } | null> {
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

export type IFindIndex = <T>(
  this: PrrayPromise<T>,
  tester: (item: T, index: number) => boolean | Promise<boolean>,
  concurrency?: number
) => Promise<number | -1> 

export const findIndex: IFindIndex = function (tester, concurrency) {
    return this.then((r) => concurrency ? _find(r, tester, {concurrency}) : _find(r, tester))
        .then((r) => r === null ? -1 : r.ix)
}

export type IFind = <T>(
  this: PrrayPromise<T>,
  tester: (item: T, index: number) => boolean | Promise<boolean>,
  concurrency?: number
) => Promise<T | null> 

export const find: IFind = function (tester, concurrency) {
    return this.then((r) => concurrency ? _find(r, tester, {concurrency}) : _find(r, tester))
        .then((r) => r === null ? null : r.ele)
}

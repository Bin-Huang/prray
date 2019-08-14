import {
  IMapAsync,
  IFilterAsync,
  IReduceAsync,
  IToArray,
  IEveryAsync,
  ISomeAsync,
  IFindAsync,
  IFindIndexAsync,
} from './methods'
import * as methods from './methods'

export interface PrrayPromise<T> extends Promise<T[]> {
  mapAsync: IMapAsync
  filterAsync: IFilterAsync
  reduceAsync: IReduceAsync
  toArray: IToArray
  everyAsync: IEveryAsync
  someAsync: ISomeAsync
  findAsync: IFindAsync
  findIndexAsync: IFindIndexAsync
}

export function prraypromise<T>(promise: Promise<T[]>): PrrayPromise<T> {
  for (const method in methods) {
    (promise as any)[method] = (methods as any)[method]
  }
  return promise as any
}

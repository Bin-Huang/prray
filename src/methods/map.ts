import pMap from 'p-map'
import { PrrayPromise, prraypromise } from '../prraypromise'

export type IMap = <T, U>(
  this: PrrayPromise<T>,
  mapper: (item: T, index: number) => U | Promise<U>,
  concurrency?: number
) => PrrayPromise<U>

export const map: IMap = function (mapper, concurrency) {
  const prom = this.then((r) => concurrency ? pMap(r, mapper, {concurrency}) : pMap(r, mapper))
  return prraypromise(prom)
}

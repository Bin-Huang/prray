import pFilter from 'p-filter'
import { PrrayPromise, prraypromise } from '../prraypromise'

export type IFilter = <T>(
  this: PrrayPromise<T>,
  tester: (item: T, index: number) => boolean | Promise<boolean>,
  concurrency?: number
) => PrrayPromise<T> 

export const filter: IFilter = function (filterer, concurrency) {
  const prom = this.then((r) => concurrency ? pFilter(r, filterer, {concurrency}) : pFilter(r, filterer))
  return prraypromise(prom)
}

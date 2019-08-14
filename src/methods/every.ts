import pEvery from 'p-every'
import { PrrayPromise } from '../prraypromise'

export type IEvery = <T>(
  this: PrrayPromise<T>,
  tester: (item: T, index: number) => boolean | Promise<boolean>,
  concurrency?: number
) => Promise<boolean>

export const every: IEvery = function (tester, concurrency) {
  return this.then((r) => concurrency ? pEvery(r, tester, {concurrency}) : pEvery(r, tester))
}

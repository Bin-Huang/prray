import pEvery from 'p-every'
import { PrrayPromise } from '../prraypromise'

export type ISome = <T>(
  this: PrrayPromise<T>,
  tester: (item: T, index: number) => boolean | Promise<boolean>,
  concurrency?: number
) => Promise<boolean> 

export const some: ISome = function (tester, concurrency) {
  const negate = async (item, ix) => !(await tester(item, ix))
  return this.then((r) => concurrency ? pEvery(r, negate, {concurrency}) : pEvery(r, negate)).then(r => !r)
}

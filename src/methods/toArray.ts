import { PrrayPromise } from '../prraypromise'

export type IToArray = <T>(this: PrrayPromise<T>) => Promise<T[]>

export const toArray: IToArray = function() {
  return this.then((r) => [...r])
}

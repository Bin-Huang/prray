import { prraypromise, PrrayPromise } from './prraypromise'

export class Prray extends Array {
  constructor(...arg: any[]) {
    super(...arg)
  }
  mapAsync(mapper: any): PrrayPromise<any> {
    return prraypromise(Promise.resolve(this)).mapAsync(mapper)
  }
}

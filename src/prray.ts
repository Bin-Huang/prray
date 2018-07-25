import { PPromise } from './ppromise'
import { prraypromise, PrrayPromise, IMapper, IFilterer, IReducer } from './prraypromise'

export class Prray<T> extends Array<T> {
  constructor(...arg: T[]) {
    super(...arg)
  }
  mapAsync<U>(mapper: IMapper<T, U>): PrrayPromise<U> {
    return prraypromise(Promise.resolve(this)).mapAsync(mapper)
  }
  filterAsync<U>(filterer: IFilterer<T>): PrrayPromise<T> {
    return prraypromise(Promise.resolve(this)).filterAsync(filterer)
  }
  reduceAsync<U>(reducer: IReducer<T, U>, initialValue: U): PPromise<U> {
    return prraypromise(Promise.resolve(this)).reduceAsync(reducer, initialValue)
  }
}

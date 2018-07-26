import { PPromise } from './ppromise'
import { prraypromise, PrrayPromise, IMapper, IFilterer, IReducer } from './prraypromise'

export class Prray<T> extends Array<T> {
  constructor(...arg: T[]) {
    super(...arg)
  }
  mapAsync<U>(mapper: IMapper<T, U>, concurrency?: number): PrrayPromise<U> {
    return prraypromise(Promise.resolve(this)).mapAsync(mapper, concurrency)
  }
  filterAsync<U>(filterer: IFilterer<T>, concurrency?: number): PrrayPromise<T> {
    return prraypromise(Promise.resolve(this)).filterAsync(filterer, concurrency)
  }
  reduceAsync<U>(reducer: IReducer<T, U>, initialValue: U, concurrency?: number): PPromise<U> {
    return prraypromise(Promise.resolve(this)).reduceAsync(reducer, initialValue, concurrency)
  }
  toArray() {
    return [...this]
  }
}

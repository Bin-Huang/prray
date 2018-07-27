import { PPromise } from './ppromise'
import {
  prraypromise,
  PrrayPromise,
  IMapper,
  ITester,
  IReducer,
} from './prraypromise'

export class Prray<T> extends Array<T> {
  constructor(...arg: T[]) {
    super(...arg)
  }
  mapAsync<U>(mapper: IMapper<T, U>, concurrency?: number): PrrayPromise<U> {
    return prraypromise(Promise.resolve(this)).mapAsync(mapper, concurrency)
  }
  filterAsync<U>(filterer: ITester<T>, concurrency?: number): PrrayPromise<T> {
    return prraypromise(Promise.resolve(this)).filterAsync(filterer, concurrency)
  }
  reduceAsync<U>(reducer: IReducer<T, U>, initialValue: U, concurrency?: number): PPromise<U> {
    return prraypromise(Promise.resolve(this)).reduceAsync(reducer, initialValue, concurrency)
  }
  everyAsync(tester: ITester<T>, concurrency?: number): Promise<boolean> {
    return prraypromise(Promise.resolve(this)).everyAsync(tester, concurrency)
  }
  someAsync(tester: ITester<T>, concurrency?: number): Promise<boolean> {
    return prraypromise(Promise.resolve(this)).someAsync(tester, concurrency)
  }
  toArray() {
    return [...this]
  }
}

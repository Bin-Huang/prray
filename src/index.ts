import * as pMap from 'p-map'
import * as pReduce from 'p-reduce'
import * as pFilter from 'p-filter'
import * as pLocate from 'p-locate'
import * as pEvery from 'p-every'

type IMapper<T, U> = (item: T, index: number) => U
type IFilterer<T> = (item: T, index: number) => boolean
type IReducer<T,U> = (pre: U, current: T, index: number) => U
type ITester<T> = (item: T) => boolean

export class Prray<T> extends Array {
  constructor(arr: T[]) {
    super(...arr as any)
  }
  toArray(): T[] {
    return [ ...this ]
  }
  async mapAsync<U>(mapper: IMapper<T, U>): Promise<Prray<U>> {
    const result: U[] = await pMap(this, mapper)
    return P(result)
  }
  async filterAsync(filterer: IFilterer<T>): Promise<Prray<T>> {
    const result: any[] = await pFilter(this, filterer)
    return P(result)
  }
  async reduceAsync<U>(reducer: IReducer<T, U>, initialValue?: U): Promise<U> {
    return pReduce(this, reducer, initialValue)
  }
  async reduceRightAsync<U>(reducer: IReducer<T, U>, initialValue?: U): Promise<U> {
    return pReduce(P(this.toArray().reverse()), reducer, initialValue)  // TODO: test
  }
  async findAsync(tester: ITester<T>): Promise<T> {
    return pLocate(this, tester) // preserveOrder 设置默认为 false，无视顺序
  }
  async findIndexAsync(tester: ITester<T>): Promise<number> {
    // TODO: 
  }
  async sortByAsync() {
    // TODO: 
  }
  // TODO: ITester
  async everyAsync(tester: ITester<T>): Promise<boolean> {
    return pEvery(this, tester)
  }
  // TODO: ITester
  async someAsync(tester: ITester<T>): Promise<boolean> {
    const tester2 = (v: T) => !tester(v)
    return !this.everyAsync(tester2)  // TODO: test
  }
}

export default async function P<T>(datas: T[]): Promise<Prray<T>> {
  return new Prray(datas)
}

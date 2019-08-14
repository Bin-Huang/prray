import { IMap, map } from './map'
import { IFilter, filter } from './filter'
import { IEvery, every } from './every'
import { ISome, some } from './some'
import { IToArray, toArray } from './toArray'
import { IReduce, reduce } from './reduce'
import { IFind, IFindIndex, find, findIndex } from './find&findIndex'

export type IMethods = {
  map: IMap
  filter: IFilter
  reduce: IReduce
  every: IEvery
  some: ISome
  find: IFind
  findIndex: IFindIndex
  toArray: IToArray
}

export const methods: IMethods = {
  map,
  filter,
  reduce,
  every,
  some,
  find,
  findIndex,
  toArray,
}

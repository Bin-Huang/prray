import { PrrayPromise } from '../prraypromise'

export type IReduce = <T, S>(
  this: PrrayPromise<T>,
  reducer: (pre: S, current: T, index: number) => S | Promise<S>,
  initialValue?: S
) => Promise<S> 

async function _reduce(datas: any[], reducer, init?) {
  // TODO: Better implementation
  let result
  let slices
  if (init === undefined) {
    result = datas[0]
    slices = datas.slice(1)
  } else {
    result = init
    slices = datas
  }
  for (let ix = 0; ix < slices.length; ix ++) {
    result = await reducer(result, slices[ix], ix)
  }
  return result
}

export const reduce: IReduce = function (reducer, initialValue?) {
  const prom = this.then((r) => _reduce(r, reducer, initialValue))
  return prom // TODO: if return promise<array>, returns prraypromise<array>???
}

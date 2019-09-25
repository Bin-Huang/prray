import { prraypromise, setPrrayConvertor } from './prraypromise'
import * as methods from './methods'

class Prray<T> extends Array {
  constructor(...args: any[]) {
    super(...args)
  }
  mapAsync(mapper: any) {
    const promise = methods.map(this, mapper)
    return prraypromise(promise)
  }
  filterAsync(func: any) {
    const promise = methods.filter(this, func)
    return prraypromise(promise)
  }
  reduceAsync(func: any, initialValue?: any) {
    const promise = methods.reduce(this, func, initialValue)
    return prraypromise(promise)
  }
  reduceRightAsync(func: any, initialValue?: any) {
    const promise = methods.reduceRight(this, func, initialValue)
    return prraypromise(promise)
  }
  sortAsync(func?: any) {
    const promise = methods.sort(this, func)
    return prraypromise(promise)
  }
  findAsync(func: any) {
    return methods.find(this, func)
  }
  findIndexAsync(func: any) {
    return methods.findIndex(this, func)
  }
  everyAsync(func: any) {
    return methods.every(this, func)
  }
  someAsync(func: any) {
    return methods.some(this, func)
  }
  forEachAsync(func: any) {
    return methods.forEach(this, func)
  }
  slice(start?: number, end?: number) {
    // 虽然原生 slice 也可以返回 Prray，但为了兼容其他环境(比如其他浏览器实现)，因此覆盖
    const result = methods.slice(this, start, end)
    return prray(result)
  }
}

function prray<T>(arr: T[]): Prray<T> {
  if (arr.length === 1) {
    const prr = new Prray()
    prr[0] = arr[0]
    return prr
  } else {
    return new Prray(...arr)
  }
}

setPrrayConvertor(prray)

export { Prray, prray }

import * as methods from './methods'

let prrayConvertor: any
function setPrrayConvertor(thePrrayConvertor: any) {
  prrayConvertor = thePrrayConvertor
}

class PrrayPromise<T> extends Promise<T> {
  constructor(props: (resolve: any, reject: any) => any) {
    super(props)
  }
  mapAsync(mapper: any) {
    const promise = this.then(v => methods.map(v, mapper))
    return prraypromise(promise)
  }
  filterAsync(func: any) {
    const promise = this.then(v => methods.filter(v, func))
    return prraypromise(promise)
  }
  reduceAsync(func: any, initialValue?: any) {
    const promise = this.then(v => methods.reduce(v, func, initialValue))
    return prraypromise(promise)
  }
  reduceRightAsync(func: any, initialValue?: any) {
    const promise = this.then(v => methods.reduceRight(v, func, initialValue))
    return prraypromise(promise)
  }
  sortAsync(func?: any) {
    const promise = this.then(v => methods.sort(v, func))
    return prraypromise(promise)
  }
  findAsync(func: any) {
    return this.then(v => methods.find(v, func))
  }
  findIndexAsync(func: any) {
    return this.then(v => methods.findIndex(v, func))
  }
  everyAsync(func: any) {
    return this.then(v => methods.every(v, func))
  }
  someAsync(func: any) {
    return this.then(v => methods.some(v, func))
  }
  forEachAsync(func: any) {
    return this.then(v => methods.forEach(v, func))
  }
  slice(start?: number, end?: number) {
    const promise = this.then(v => methods.slice(v, start, end))
    return prraypromise(promise)
  }
}

function prraypromise<T>(promise: Promise<T>) {
  if (promise instanceof Promise) {
    return new PrrayPromise<T>((resolve, reject) => {
      promise.then((arr) => {
        if (arr instanceof Array) {
          resolve(prrayConvertor(arr))
        } else {
          resolve(arr)
        }
      })
      promise.catch(reject)
    })
  }
  throw new Error('expected promise')
}

export { PrrayPromise, prraypromise, setPrrayConvertor }

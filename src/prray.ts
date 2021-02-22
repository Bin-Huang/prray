import { prraypromise, PrrayPromise } from './prraypromise'
import * as methods from './methods'

// TODO: thisArg

export default class Prray<T> extends Array<T> {
  /**
    _Compatible with [`Array.of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of) but returns a Prray instance._

    The Prray.of() method creates a new Prray instance from a variable number of arguments, regardless of number or type of the arguments.

    ```javascript
    const prr = Prray.of(1, 2, 3, 4)
    ```
   * @param args 
   */
  static of<T>(...args: T[]): Prray<T> {
    return Prray.from(args)
  }

  /**
    The Prray.isArray() method determines whether the passed value is a Prray instance.

    ```javascript
    Prray.isPrray([1, 2, 3]) // false
    Prray.isPrray(new Prray(1, 2, 3)) // true
    ```
   * @param obj 
   */
  static isPrray(obj: any): boolean {
    return obj instanceof Prray
  }

  /**
    _Compatible with [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) but returns a Prray instance._

    The Prray.from() method creates a new, shallow-copied Prray instance from an array-like or iterable object.

    ```javascript
    const prr = Prray.from([1, 2, 3, 4])
    ```
   * @param arrayLike 
   */
  static from<T>(arrayLike: Iterable<T> | ArrayLike<T>): Prray<T>
  static from<T, U>(arrayLike: Iterable<T> | ArrayLike<T>, mapFunc: (v: T, ix: number) => U, thisArg?: any): Prray<U>
  static from<T, U>(
    arrayLike: Iterable<T> | ArrayLike<T>,
    mapFunc?: (v: T, ix: number) => U,
    thisArg?: any,
  ): Prray<any> {
    const arr = mapFunc === undefined ? super.from(arrayLike) : super.from(arrayLike, mapFunc, thisArg)
    const prr = new Prray()
    for (let i = arr.length - 1; i >= 0; i--) {
      prr[i] = arr[i]
    }
    return prr
  }

  /**
    The Prray.delay() method returns a promise (`PrrayPromise` exactly) that will be resolved after given ms milliseconds.

    ```javascript
    await Prray.delay(1000) // resolve after 1 second

    const prr = Prray.from([1,2,3])
    await prr
        .mapAsync(action1)
        .delay(500)    // delay 500ms between two iterations
        .forEach(action2)
    ```
   * @param ms 
   */
  static delay<T>(ms: number): PrrayPromise<T> {
    const prray = new Prray<T>()
    return new PrrayPromise(resolve => setTimeout(() => resolve(prray), ms))
  }

  constructor(length: number)
  constructor(...args: T[])
  constructor(...args: any[]) {
    super(...args)
  }

  /**
    _Think of it as an async version of method `map`_

    The mapAsync() method returns a promise (`PrrayPromise` exactly) that resolved with a new prray with the resolved results of calling a provided async function on every element in the calling prray, or rejected immediately if any of the promises reject.

    The provided async function is called on every element concurrently. You may optionally specify a concurrency limit.

    - `func(currentValue, index, prray)`
    - options
        - `concurrency` Number of concurrently pending promises returned by provided function. Default: `Infinity`

    ```javascript
    const urls = Prray.from(urlArray)
    const jsons = await urls.mapAsync(fetch).mapAsync(res => res.json())
    await jsons.mapAsync(insertToDB, { concurrency: 2 })
    ```
   * @param func 
   * @param opts 
   */
  mapAsync<U>(
    func: (currentValue: T, index: number, prray: Prray<T>) => Promise<U> | U,
    opts?: { concurrency: number },
  ): PrrayPromise<U> {
    const promise = methods.mapAsync(this, func, opts)
    return prraypromise(promise.then(arr => Prray.from(arr)))
  }

  map<U>(func: (currentValue: T, index: number, prray: Prray<T>) => U): Prray<U> {
    return _ensurePrray(methods.map(this, func))
  }

  /**
    _Think of it as an async version of method `filter`_

    The filterAsync() method returns a promise (`PrrayPromise` exactly) that resolved with a new prray with all elements that pass the test implemented by the provided async function, or rejected immediately if any of the promises reject.

    The provided async function is called on every element concurrently. You may optionally specify a concurrency limit.

    - `func(currentValue, index, prray)`
    - options
        - `concurrency` Number of concurrently pending promises returned by provided function. Default: `Infinity`

    ```javascript
    const files = Prray.from(fileArray)
    await files.filterAsync(isExisted).mapAsync(removeFile)
    await files.filterAsync(isExisted, { concurrency: 2 })
    ```
   * @param func 
   * @param opts 
   */
  filterAsync(
    func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean,
    opts?: { concurrency: number },
  ): PrrayPromise<T> {
    const promise = methods.filterAsync(this, func, opts)
    return prraypromise(promise.then(arr => Prray.from(arr)))
  }

  filter(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): Prray<T> {
    return _ensurePrray(methods.filter(this, func))
  }

  /**
    _Think of it as an async version of method `reduce`_

    The reduceAsync() method executes a async reducer function (that you provide) on each element of the prray, resulting in a single output value resolved by a promise (`PrrayPromise` exactly).

    ```javascript
    const productIds = Prray.from(idArray)
    const total = await productIds.reduceAsync(async (total, id) => {
        const price = await getPrice(id)
        return total + price
    }, 0)
    ```
   * @param func 
   */
  reduceAsync(func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T | Promise<T>): Promise<T>
  reduceAsync(
    func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T | Promise<T>,
    initialValue: T,
  ): Promise<T>
  reduceAsync<U>(
    func: (accumulator: U, currentValue: T, index: number, prray: Prray<T>) => U | Promise<U>,
    initialValue: U,
  ): Promise<U>
  reduceAsync(
    func: (accumulator: any, currentValue: T, index: number, prray: Prray<T>) => any | Promise<any>,
    initialValue?: any,
  ): Promise<any> {
    const promise = methods.reduceAsync(this, func, initialValue)
    return promise
  }

  reduce(func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T): T
  reduce(func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T, initialValue: T): T
  reduce<U>(func: (accumulator: U, currentValue: T, index: number, prray: Prray<T>) => U, initialValue: U): U
  reduce(func: (accumulator: any, currentValue: T, index: number, prray: Prray<T>) => any, initialValue?: any): any {
    return methods.reduce(this, func, initialValue)
  }

  /**
    _Think of it as an async version of method `reduceRight`_

    The reduceRightAsync() method applies an async function against an accumulator and each value of the prray (from right-to-left) to reduce it to a single value.

    ```javascript
    const productIds = Prray.from(idArray)
    const total = await productIds.reduceRightAsync(async (total, id) => {
        const price = await getPrice(id)
        return total + price
    }, 0)
    ```
   * @param func 
   */
  reduceRightAsync(
    func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T | Promise<T>,
  ): Promise<T>
  reduceRightAsync(
    func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T | Promise<T>,
    initialValue: T,
  ): Promise<T>
  reduceRightAsync<U>(
    func: (accumulator: U, currentValue: T, index: number, prray: Prray<T>) => U | Promise<U>,
    initialValue: U,
  ): Promise<U>
  reduceRightAsync(
    func: (accumulator: any, currentValue: T, index: number, prray: Prray<T>) => any | Promise<any>,
    initialValue?: any,
  ): Promise<any> {
    const promise = methods.reduceRightAsync(this, func, initialValue)
    return promise
  }

  reduceRight(func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T): T
  reduceRight(func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T, initialValue: T): T
  reduceRight<U>(func: (accumulator: U, currentValue: T, index: number, prray: Prray<T>) => U, initialValue: U): U
  reduceRight(
    func: (accumulator: any, currentValue: T, index: number, prray: Prray<T>) => any,
    initialValue?: any,
  ): any {
    return methods.reduceRight(this, func, initialValue)
  }

  /**
    _Think of it as an async version of method `sort`_

    The sortAsync() method sorts the elements of a prray in place and returns a promise (`PrrayPromise` exactly) resolved with the sorted prray. The provided function can be an async function that returns a promise resolved with a number.

    ```javascript
    const students = Prray.from(idArray)

    const rank = await students.sortAsync((a, b) => {
        const scoreA = await getScore(a)
        const scoreB = await getScore(b)
        return scoreA - scoreB
    })
    ```
   * @param func 
   */
  sortAsync(func?: (a: T, b: T) => Promise<number> | number): PrrayPromise<T> {
    const promise = methods.sortAsync(this, func)
    return prraypromise(promise)
  }

  /**
    _Think of it as an async version of method `find`_

    The findAsync() method returns a promise (`PrrayPromise` exactly) resolved with the first element in the prray that satisfies the provided async testing function.

    ```javascript
    const workers = Prray.from(workerArray)
    const unhealthy = await workers.findAsync(checkHealth)
    ```
   * @param func 
   */
  findAsync(
    func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean,
  ): Promise<T | undefined> {
    return methods.findAsync(this, func)
  }

  find(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): T | undefined {
    return methods.find(this, func)
  }

  /**
    _Think of it as an async version of method `findIndex`_

    The findIndexAsync() method returns a promise (`PrrayPromise` exactly) resolved with the index of the first element in the prray that satisfies the provided async testing function. Otherwise, it returns promise resolved with -1, indicating that no element passed the test.

    ```javascript
    const workers = Prray.from(workerArray)
    const ix = await workers.findIndexAsync(checkHealth)
    const unhealthy = workers[ix]
    ```
   */
  findIndexAsync(
    func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean,
  ): Promise<number> {
    return methods.findIndexAsync(this, func)
  }

  findIndex(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): number {
    return methods.findIndex(this, func)
  }

  /**
    _Think of it as an async version of method `every`_

    The everyAsync() method tests whether all elements in the prray pass the test implemented by the provided async function. It returns a promise (`PrrayPromise` exactly) that resolved with a Boolean value, or rejected immediately if any of the promises reject.

    The provided async function is called on every element concurrently. You may optionally specify a concurrency limit.

    - `func(currentValue, index, prray)`
    - options
        - `concurrency` Number of concurrently pending promises returned by provided function. Default: `Infinity`

    ```javascript
    const filenames = Prray.from(fileNameArray)
    const isAllFileExisted = await filenames.everyAsync(isExisted)
    if (isAllFileExisted) {
        // do some things
    }
    ```
   */
  everyAsync(
    func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean,
    opts?: { concurrency: number },
  ): Promise<boolean> {
    return methods.everyAsync(this, func, opts)
  }

  every(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): boolean {
    return methods.every(this, func)
  }

  /**
    _Think of it as an async version of method `some`_

    The some() method tests whether at least one element in the prray passes the test implemented by the provided async function. It returns a promise (`PrrayPromise` exactly) that resolved with Boolean value, or rejected immediately if any of the promises reject.

    The provided async function is called on every element concurrently. You may optionally specify a concurrency limit.

    - `func(currentValue, index, prray)`
    - options
        - `concurrency` Number of concurrently pending promises returned by provided function. Default: `Infinity`

    ```javascript
    const filenames = Prray.from(fileNameArray)
    const hasExistedFile = await filenames.someAsync(isExisted)
    if (hasExistedFile) {
        // do some things
    }
    ```
   */
  someAsync(
    func: (currentValue: T, index: number, prray: Prray<T>) => Promise<boolean> | boolean,
    opts?: { concurrency: number },
  ): Promise<boolean> {
    return methods.someAsync(this, func, opts)
  }

  some(func: (currentValue: T, index: number, prray: Prray<T>) => boolean): boolean {
    return methods.some(this, func)
  }

  /**
    _Think of it as an async version of method `forEach`_

    The forEachAsync() method executes a provided async function once for each prray element concurrently. It returns a promise (`PrrayPromise` exactly) that resolved after all iteration promises resolved, or rejected immediately if any of the promises reject.

    The provided async function is called on every element concurrently. You may optionally specify a concurrency limit.

    - `func(currentValue, index, prray)`
    - options
        - `concurrency` Number of concurrently pending promises returned by provided function. Default: `Infinity`

    ```javascript
    const emails = Prray.from(emailArray)
    await emails.forEachAsync(sendAsync)
    await emails.forEachAsync(sendAsync, { concurrency: 20 })
    ```
   * @param func 
   * @param opts 
   */
  forEachAsync(
    func: (currentValue: T, index: number, prray: Prray<T>) => Promise<any> | any,
    opts?: { concurrency: number },
  ): Promise<undefined> {
    return methods.forEachAsync(this, func, opts)
  }

  forEach(func: (currentValue: T, index: number, prray: Prray<T>) => any): undefined {
    return methods.forEach(this, func)
  }

  slice(start?: number, end?: number): Prray<T> {
    const result: T[] = super.slice(start, end)
    return _ensurePrray(result)
  }

  concat(...items: ConcatArray<T>[]): Prray<T>
  concat(...items: (ConcatArray<T> | T)[]): Prray<T>
  concat(...items: any[]): Prray<T> {
    return _ensurePrray(super.concat(...items))
  }

  reverse(): Prray<T> {
    return super.reverse() as Prray<T>
  }

  splice(start: number): Prray<T>
  splice(start: number, deleteCount: number): Prray<T>
  splice(start: number, deleteCount: number, ...items: T[]): Prray<T>
  splice(start: number, deleteCount?: number, ...items: T[]): Prray<T> {
    // Why? If pass parameter deleteCount as undefined directly, the delete count will be zero actually :(
    const result = deleteCount === undefined ? super.splice(start) : super.splice(start, deleteCount, ...items)
    return _ensurePrray(result)
  }

  /**
    The toArray() method returns a new normal array with every element in the prray.

    ```javascript
    const prr = new Prray(1, 2, 3)
    prr.toArray() // [1,2,3]
    ```
   */
  toArray(): T[] {
    return [...this]
  }

  /**
    The delay() method returns a promise (`PrrayPromise` exactly) that will be resolved with current prray instance after given ms milliseconds.

    ```javascript
    const emails = Prray.from(emailArray)
    await emails
        .mapAsync(registerReceiver)
        .delay(1000)
        .forEachAsync(send)
    ```
   */
  delay(ms: number): PrrayPromise<T> {
    return new PrrayPromise(resolve => setTimeout(() => resolve(this), ms))
  }
}

export function _ensurePrray<T>(arr: T[]): Prray<T> {
  if (arr instanceof Prray) {
    return arr
  } else {
    return Prray.from(arr)
  }
}

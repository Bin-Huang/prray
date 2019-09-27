// TODO: talk about tests, under development

Prray -- "Promisified" Array, aims to replace original Array in some cases for convenience

- comes with async methods, such as `mapAsync`, `filterAsync`, `everyAsync` .etc
- supports method chaning with async methods
- compatible with original array

```javascript
import { prray } from 'prray'

(async () => {

  // Convert original array to "prray"
  const prr = prray(['www.google.com', 'npmjs.org'])

  // Now you can do something like this
  const responses = await prr.mapAsync(fetch)

  // Method chaining with async function works well just like with common function.
  const htmls = await prr.mapAsync(fetch).mapAsync(r => r.text())

  await prr.sortAsync(asyncFunc).map(commonFunc).reduceAsync(asyncFunc2)

})()
```


## Install

npm

```
npm install prray --save
```

yarn

```
yarn add prray
```


## Compatibility with original Array

```javascript
import { prray, Prray } from 'prray'

const arr = [1,2,3]
const prr = prray(arr)

prr[0]  // 1
prr.length  // 4

[...prr]  // [1,2,3]

prr instanceof Array // true

Array.isArray(prr) // true

JSON.stringify(prr)  // "[1, 2, 3]"

const iterator = prr[Symbol.iterator]()
iterator.next().value  // 1
iterator.next().value  // 2
iterator.next().value  // 3
iterator.next().done  // true

// Type compatibility in typescript
function yourFunc(arr: number[]) {
  return arr
}
yourFunc(new Prray(1,2,3))  // Type Prray is compatible with Array
```

How to distinguish prray with array:
```javascript
prr instanceof Prray // true
arr instanceof Prray // false
```

## Usage

#### prray(array)

Method `prray` convert a normal array to prray.

```javascript
import { prray } from 'prray'

const prr = prray([1,2,3])
```

#### new Prray()

Class `Prray`. You can think of it as `Array`.

```javascript
import { Prray } from 'prray'

new Prray()  // just like new Array()
new Prray(1)  // just like new Array(1)
new Prray('a', 'b')  // just like new Array('a', 'b')
```

#### Prray.prototype.map(callback)

- `callback(currentValue, index, prray)`

Compatible with [Array.prototype.map]()

#### Prray.prototype.mapAsync(callback)

The `map` method returns promise of a new array with the return values or the resolved values of return promises of calling a provided callback on every element.

- `callback(currentValue, index, prray)`

```javascript
const resps = await prr.mapAsync(fetch)

// Method chaining
const jsons = await prr.mapAsync(fetch).mapAsync(res => res.json())

// Method chaining with other methods
const jsons = await prr.mapAsync(func1).filter(func2).everyAsync(fun3)
```

#### * Prray.prototype.filter(callback)

The `filter` method returns promise of a new array with all elements that pass the test implemented by the provided function. You can think of it as **an async version of `Array.prototype.filter`**.

```javascript
// With async callback
const existedFiles = await prr.filter(isFileExisted)

// With common callback
const evenNums = await prr.filter(v => v % 2 === 0)

// Method chaining
await prr.filter(isFileExisted).map(removeFile)
```


----------------------------------------------------------------------------

You also can **chain method calls** even if them returns promise 😻!

## Different from [Bluebird](https://github.com/petkaantonov/bluebird)

**First**, prray does not provide another implementation of promise, which is essentially different from Bluebird.

**Secondly**, prray aims to provide a better way to handle asynchronous batch operations on data(array). In this aspect, maybe you work well with Bluebird's methods such as `all` and `map`, but prray gives you another option more appropriate in some cases.

```javascript
const urls = [ /* some urls */ ]

// use prray
await p(urls).mapAsync(fetch)
  .filterAsync(isExisted)
  .mapAsync(saveAsync)

// use bluebird
await Bluebird.mapAsync(await Bluebird.filter(await Bluebird.map(urls, fetch), isExisted), saveAsync)

// use bluebird and prettier
let responses = await Bluebird.map(urls, fetch)
responses = await Bluebird.filter(responses, isExisted)
await Bluebird.map(responses, saveAsync)
```

If you want a good promise implementation, this is bluebird.

If you want to handle asynchronous batch operations on data(array), prray is an option for you.

## Installation

npm:

```
npm install prray --save
```

yarn:

```
yarn add prray
```

## Prray

Get a prray from existing array using function `p`.

```javascript
const p = require('prray')
const arr = [1,2,3]

const prray = p(arr)
prray.mapAsync(funcAsync).then(console.log)
```

- Prray#mapAsync -> Array#map
- Prray#filterAsync -> Array#filter
- Prray#reduceAsync -> Array#reduce
- Prray#everyAsync -> Array#every
- Prray#someAsync -> Array#some
- Prray#findAsync -> Array#find
- Prray#findIndexAsync -> Array#findIndex
- Prray#toArray

## Method Chaining

```javascript
await p(arr).filterAsync(existAsync).mapAsync(postAsync)

// equals to:

let existed = await p(arr).filterAsync(existAsync)
await existed.mapAsync(postAsync)
```

## Methods

### mapAsync(mapper, concurrency?)

an async version of Array#map

```javascript
await p(urls).mapAsync(async (url, ix) => {
  const res = await fetch(url)
  return res.json()
})
```

### filterAsync(filterer, concurrency?)

an async version of Array#filter

```javascript
await p(filenames).filterAsync(async (filename, ix) => {
  return existsAsync(filename)
})
```

### reduceAsync(reducer, initialValue)

an async version of Array#reduce

```javascript
await p(userIds).reduceAsync(async (sum, uid, ix) => {
  const score = await getScoreFromDB(uid)
  return sum + score
}, 0)
```

### everyAsync(tester, concurrency?)

an async version of Array#every

```javascript
const areVip = await p(users).everyAsync(async (user, ix) => {
  return await userModel.isVip(user)
})
console.log(areVip) // true
```

### someAsync(tester, concurrency?)

an async version of Array#some

```javascript
const hasVipUser = await p(users).someAsync(async (user, ix) => {
  return await userModel.isVip(user)
})
console.log(areVip) // true
```

### findAsync(tester, concurrency?)

an async version of Array#find

```javascript
const vipUser = await p(users).findAsync(isVipAsync)
```

### findIndexAsync(tester, concurrency?)

an async version of Array#findIndex

```javascript
const ix = await p(users).findIndexAsync(isVipAsync)
const vipUser = users[ix]
```

### and all of common methods of Array

Such as `map`, `filter`, `indexOf`, `lastIndexOf` ...

## concurrency

You may optionally specify a concurrency limit when calling async method. It is useful when perform some resource-consuming operations in large batches, such as querying the database.
 
```javascript
await p(urls).mapAsync(fetch, 10) // concurrency limit 10
```

> NOTE: method `reduceAsync` does NOT support concurrency limit, its concurrency is alway 1.

## Compatible with Array

```javascript
const prr = p([1,2,3,4])

Array.isArray(prr) // true
prr instanceof Array // true
JSON.stringify(prr) === JSON.stringify([1,2,3,4])  // true
console.log(prr.map) // [Function]
console.log(prr.length) // 4

console.log(prr.mapAsync) // [Function]
```

In some cases you may need a 'pure' array, just call method `toArray`.

```javascript
const p = p([1,2,3])
console.log(p.toArray())  // [1,2,3]
```

## TODO

- [x] Concurrency
- [ ] A well-designed logo
- [ ] Sub-task promise supports `timeout`, such like `await prr.mapAsync(fetch, {timeout: 3000})`
- [ ] Sub-task promise supports `retry` when rejected, such like `await prr.mapAsync(fetch, {retries: 2})`
- [ ] Browser compatibility survey
- [ ] Prettier document
- [ ] Revise documentation, including syntax errors
- ......

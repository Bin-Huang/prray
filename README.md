[![Travis](https://img.shields.io/travis/Bin-Huang/prray)](https://travis-ci.com/Bin-Huang/prray)
[![Package version](https://img.shields.io/npm/v/prray)](https://www.npmjs.com/package/prray)
[![Coverage Status](https://coveralls.io/repos/github/Bin-Huang/prray/badge.svg?branch=master)](https://coveralls.io/github/Bin-Huang/prray?branch=master)
[![Install size](https://packagephobia.now.sh/badge?p=prray)](https://packagephobia.now.sh/result?p=prray)
![License](https://img.shields.io/npm/l/prray)

<!-- [![Download](https://img.shields.io/npm/dm/prray)](https://www.npmjs.com/package/prray) -->

Prray -- "Promisified" Array, it compatible with the original Array but comes with async versions of native Array methods, such as mapAsync, filterAsync, everyAsync...

- [compatible with normal array](#compatibility-with-normal-array)
- comes with async versions of native Array methods
- supports **method chaining** with normal and async methods
- supports concurrency limit
- it works without any prototype pollution
- [zero-dependency](https://github.com/Bin-Huang/prray/blob/master/package.json#L7), it can run on both browser and Node.js
- [well-tested](https://github.com/Bin-Huang/prray/tree/master/test), well-documented 

```javascript
import Prray from 'prray'

// 1) create
const urls = Prray.from(['www.google.com', 'npmjs.org'])


// 2) async method
const responses = await urls.mapAsync(fetch)


// 3) method chaining with both normal and async methods
await urls
  .concat(['github.com', 'wikipedia.org'])
  .mapAsync(request)
  .filter(isValidHtml)
  .forEachAsync(saveToDB)


// 4) concurrency limit
const responses = await urls.mapAsync(fetch, { concurrency: 10 })
```

> Prray aims to replace the original Array in some cases for convenience 😜

- [Install](#install)
- [Compatibility with normal Array](#compatibility-with-normal-array)
- [How it work?](#how-it-work)
- [Distinguish between prray and normal array](#distinguish-between-prray-and-normal-array)
- [Methods](#methods)
  - [Class Prray](#class-prray)
  - [Static methods of Class Prray](#static-methods-of-class-prray)
  - [Specific methods of Prray instance](#specific-methods-of-prray-instance)
  - [Other methods of Prray instance (compatible with Array)](#other-methods-of-prray-instance-compatible-with-array)
- [Why not `bluebird`](#why-not-bluebird)
- [License](#license)

## Install

npm

```
npm install prray --save
```

yarn

```
yarn add prray
```

## Compatibility with normal Array

Prray is compatible with normal array. That means you can safely replace normal Array with Prray. And there are [a lots of unit tests](https://github.com/Bin-Huang/prray/tree/master/test) for prray to test compatibility with normal array.

```javascript
import Prray from 'prray'

const arr = [1, 2, 3]
const prr = Prray.from(arr)


prr[0] // 1
prr[prr.length - 1] // 3
prr.length // 3


prr instanceof Array // true
Array.isArray(prr) // true


JSON.stringify(prr) // "[1, 2, 3]"


for (const v of prr) {
  console.log(v)
}
// 1
// 2
// 3


[ ...prr ] // [1,2,3]


const iterator = prr[Symbol.iterator]()
iterator.next().value // 1
iterator.next().value // 2
iterator.next().value // 3
iterator.next().done // true


// In typescript, type Prray is compatible with type Array
function func(arr: number[]) {
  return arr
}
func(new Prray(1, 2, 3))
```

## How it work?

Class Prray inherits the original class Array and adds or overrides methods based on it. It works without any prototype pollution and global pollution.

```javascript
const prr = Prray.from([1, 2, 3])
console.log(prr.mapAsync) // [Function]

const arr = [1, 2, 3]
console.log(arr.mapAsync) // [undefined]
```

## Distinguish between prray and normal array

```javascript
const prr = new Prray(1, 2, 3)
const arr = new Array(1, 2, 3)

Prray.isPrray(prr) // true
Prray.isPrray(arr) // false

prr instanceof Prray // true
arr instanceof Prray // false
```

## Methods

### Class Prray

The class `Prray`. You can think of it as class `Array`.

```javascript
import Prray from 'prray'

const p1 = new Prray()
const p2 = new Prray('a', 'b')
const p3 = Prray.from([1, 2, 3, 4])

console.log(p2[0]) // 'a'
```

> **[NOTE]: Instead `new Prray()`, use `Prray.from` or `Prray.of` if you want to create a new prray instance with items**. Because the class Prray is so compatible with class Array, some "weird" behaviors that exists in `new Array()` can also occurs: when you calling `new Array(1)`, you get `[ <1 empty item> ]` instead of expected `[ 1 ]`.

### Static methods of Class Prray

- [Prray.from(arrayLike)](#prrayfromarraylike)
- [Prray.of(...args)](#prrayofargs)
- [Prray.isPrray(obj)](#prrayisprrayobj)

#### Prray.from(arrayLike)

_Compatible with [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) but returns a Prray instance._

The Prray.from() method creates a new, shallow-copied Prray instance from an array-like or iterable object.

```javascript
import Prray from 'prray'

const prr = Prray.from([1, 2, 3, 4])
```

#### Prray.of(...args)

_Compatible with [`Array.of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of) but returns a Prray instance._

The Prray.of() method creates a new Prray instance from a variable number of arguments, regardless of number or type of the arguments.

```javascript
import Prray from 'prray'

const prr = Prray.of(1, 2, 3, 4)
```

#### Prray.isPrray(obj)

The Prray.isArray() method determines whether the passed value is a Prray instance.

```javascript
import Prray from 'prray'

Prray.isPrray([1, 2, 3]) // false
Prray.isPrray(new Prray(1, 2, 3)) // true
```

### Specific methods of Prray instance

- [Prray.prototype.toArray()](#prrayprototypetoarray)
- [Prray.prototype.mapAsync(func, options)](#prrayprototypemapasyncfunc-options)
- [Prray.prototype.filterAsync(func, options)](#prrayprototypefilterasyncfunc-options)
- [Prray.prototype.reduceAsync(func, initialValue)](#prrayprototypereduceasyncfunc-initialvalue)
- [Prray.prototype.reduceRightAsync(func, initialValue)](#prrayprototypereducerightasyncfunc-initialvalue)
- [Prray.prototype.findAsync(func)](#prrayprototypefindasyncfunc)
- [Prray.prototype.findIndexAsync(func)](#prrayprototypefindindexasyncfunc)
- [Prray.prototype.everyAsync(func, options)](#prrayprototypeeveryasyncfunc-options)
- [Prray.prototype.someAsync(func, options)](#prrayprototypesomeasyncfunc-options)
- [Prray.prototype.sortAsync(func)](#prrayprototypesortasyncfunc)
- [Prray.prototype.forEachAsync(func, options)](#prrayprototypeforeachasyncfunc-options)

#### Prray.prototype.toArray()

The toArray() method returns a new normal array with every element in the prray.

```javascript
const prr = new Prray(1, 2, 3)

prr.toArray() // [1,2,3]
```

#### Prray.prototype.mapAsync(func, options)

_Think of it as an async version of method `map`_

The mapAsync() method returns a promise resolved with a new prray with the resolved results of calling a provided async function on every element in the calling prray.

The provided async function is called on every element concurrently.

- `func(currentValue, index, prray)`
- options
  - `concurrency` Number of concurrently pending promises returned by provided function. Default: `Infinity`

```javascript
const urls = Prray.from([ /* urls */ ])

const jsons = await urls.mapAsync(fetch).mapAsync(res => res.json())

await jsons.mapAsync(insertToDB, { concurrency: 2 })
```

#### Prray.prototype.filterAsync(func, options)

_Think of it as an async version of method `filter`_

The filterAsync() method returns a promise resolved with a new prray with all elements that pass the test implemented by the provided async function.

The provided async function is called on every element concurrently.

- `func(currentValue, index, prray)`
- options
  - `concurrency` Number of concurrently pending promises returned by provided function. Default: `Infinity`

```javascript
const files = Prray.from([ /* filenames */ ])

await files.filterAsync(isExisted).mapAsync(removeFile)

await files.filterAsync(isExisted, { concurrency: 2 })
```

#### Prray.prototype.reduceAsync(func, initialValue)

_Think of it as an async version of method `reduce`_

The reduceAsync() method executes a async reducer function (that you provide) on each element of the prray, resulting in a single output value resolved by a promise.

```javascript
const productIds = Prray.from([ /* ids */ ])

const total = await productIds.reduceAsync(async (total, id) => {
  const price = await getPrice(id)
  return total + price
}, 0)
```

#### Prray.prototype.reduceRightAsync(func, initialValue)

_Think of it as an async version of method `reduceRight`_

The reduceRightAsync() method applies an async function against an accumulator and each value of the prray (from right-to-left) to reduce it to a single value.

```javascript
const productIds = Prray.from([ /* ids */ ])

const total = await productIds.reduceRightAsync(async (total, id) => {
  const price = await getPrice(id)
  return total + price
}, 0)
```

#### Prray.prototype.findAsync(func)

_Think of it as an async version of method `find`_

The findAsync() method returns a promise resolved with the first element in the prray that satisfies the provided async testing function.

```javascript
const workers = Prray.from([ /* workers */ ])

const unhealthy = await workers.findAsync(checkHealth)
```

#### Prray.prototype.findIndexAsync(func)

_Think of it as an async version of method `findIndex`_

The findIndexAsync() method returns a promise resolved with the index of the first element in the prray that satisfies the provided async testing function. Otherwise, it returns promise resolved with -1, indicating that no element passed the test.

```javascript
const workers = Prray.from([ /* workers */ ])
const ix = await workers.findIndexAsync(checkHealth)
const unhealthy = workers[ix]
```

#### Prray.prototype.everyAsync(func, options)

_Think of it as an async version of method `every`_

The everyAsync() method tests whether all elements in the prray pass the test implemented by the provided async function. It returns a promise resolved with a Boolean value.

The provided async function is called on every element concurrently.

- `func(currentValue, index, prray)`
- options
  - `concurrency` Number of concurrently pending promises returned by provided function. Default: `Infinity`

```javascript
const filenames = Prray.from([ /* filenames */ ])

const isAllFileExisted = await filenames.everyAsync(isExisted)
if (isAllFileExisted) {
  // do some things
}
```

#### Prray.prototype.someAsync(func, options)

_Think of it as an async version of method `some`_

The some() method tests whether at least one element in the prray passes the test implemented by the provided async function. It returns a promise resolved with Boolean value.

The provided async function is called on every element concurrently.

- `func(currentValue, index, prray)`
- options
  - `concurrency` Number of concurrently pending promises returned by provided function. Default: `Infinity`

```javascript
const filenames = Prray.from([ /* filenames */ ])

const hasExistedFile = await filenames.someAsync(isExisted)
if (hasExistedFile) {
  // do some things
}
```

#### Prray.prototype.sortAsync(func)

_Think of it as an async version of method `sort`_

The sortAsync() method sorts the elements of a prray in place and returns a promise resolved with the sorted prray. The provided function can be an async function that returns a promise resolved with a number.

```javascript
const students = Prray.from([ /* ids */ ])

const rank = await students.sortAsync((a, b) => {
  const scoreA = await getScore(a)
  const scoreB = await getScore(b)
  return scoreA - scoreB
})
```

#### Prray.prototype.forEachAsync(func, options)

_Think of it as an async version of method `forEach`_

The forEachAsync() method executes a provided async function once for each prray element concurrently and returns a promise resolved after all iteration promises resolved.

- `func(currentValue, index, prray)`
- options
  - `concurrency` Number of concurrently pending promises returned by provided function. Default: `Infinity`

```javascript
const emails = Prray.from([ /* emails */ ])
await emails.forEachAsync(sendAsync)

// or
await emails.forEachAsync(sendAsync, { concurrency: 20 })
```

### Other methods of Prray instance (compatible with Array)

- [Prray.prototype.map(func)](#prrayprototypemapfunc)
- [Prray.prototype.filter(func)](#prrayprototypefilterfunc)
- [Prray.prototype.reduce(func, initialValue)](#prrayprototypereducefunc-initialvalue)
- [Prray.prototype.reduceRight(func, initialValue)](#prrayprototypereducerightfunc-initialvalue)
- [Prray.prototype.find(func)](#prrayprototypefindfunc)
- [Prray.prototype.findIndex(func)](#prrayprototypefindindexfunc)
- [Prray.prototype.every(func)](#prrayprototypeeveryfunc)
- [Prray.prototype.some(func)](#prrayprototypesomefunc)
- [Prray.prototype.sort(func)](#prrayprototypesortfunc)
- [Prray.prototype.forEach(func)](#prrayprototypeforeachfunc)
- [Prray.prototype.slice(start, end)](#prrayprototypeslicestart-end)
- [Prray.prototype.includes(value)](#prrayprototypeincludesvalue)
- [Prray.prototype.indexOf(value)](#prrayprototypeindexofvalue)
- [Prray.prototype.lastIndexOf(value)](#prrayprototypelastindexofvalue)
- [Prray.prototype.join(separator)](#prrayprototypejoinseparator)
- [Prray.prototype.keys()](#prrayprototypekeys)
- [Prray.prototype.values()](#prrayprototypevalues)
- [Prray.prototype.entries()](#prrayprototypeentries)
- [Prray.prototype.fill(value, start, end)](#prrayprototypefillvalue-start-end)
- [Prray.prototype.concat(arr)](#prrayprototypeconcatarr)
- [Prray.prototype.copyWithin(target, star, end)](#prrayprototypecopywithintarget-star-end)
- [Prray.prototype.pop()](#prrayprototypepop)
- [Prray.prototype.push(...elements)](#prrayprototypepushelements)
- [Prray.prototype.reverse()](#prrayprototypereverse)
- [Prray.prototype.shift()](#prrayprototypeshift)
- [Prray.prototype.unshift(...elements)](#prrayprototypeunshiftelements)
- [Prray.prototype.splice(start, deleteCount, ...items)](#prrayprototypesplicestart-deletecount-items)
- [Prray.prototype.toString()](#prrayprototypetostring)
- [Prray.prototype.toLocaleString()](#prrayprototypetolocalestring)

#### Prray.prototype.map(func)

_Compatible with [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)_ but returns a Prray instance.

The map() method creates a new prray with the results of calling a provided function on every element in the calling prray.

#### Prray.prototype.filter(func)

_Compatible with [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)_ but returns a Prray instance.

The filter() method creates a new prray with all elements that pass the test implemented by the provided function.

#### Prray.prototype.reduce(func, initialValue)

_Compatible with [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)_.

The reduce() method executes a reducer function (that you provide) on each element of the prray, resulting in a single output value.

#### Prray.prototype.reduceRight(func, initialValue)

_Compatible with [Array.prototype.reduceRight](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight)_

The reduceRight() method applies a function against an accumulator and each value of the prray (from right-to-left) to reduce it to a single value.

#### Prray.prototype.find(func)

_Compatible with [Array.prototype.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)_

The find() method returns the value of the first element in the prray that satisfies the provided testing function.

#### Prray.prototype.findIndex(func)

_Compatible with [Array.prototype.findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)_

The findIndex() method returns the index of the first element in the prray that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.

#### Prray.prototype.every(func)

_Compatible with [Array.prototype.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)_

The every() method tests whether all elements in the prray pass the test implemented by the provided function. It returns a Boolean value.

#### Prray.prototype.some(func)

_Compatible with [Array.prototype.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)_

The some() method tests whether at least one element in the prray passes the test implemented by the provided function. It returns a Boolean value.

#### Prray.prototype.sort(func)

_Compatible with [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)_

The sort() method sorts the elements of a prray in place and returns the sorted prray.

#### Prray.prototype.forEach(func)

_Compatible with [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)_

The forEach() method executes a provided function once for each prray element.

#### Prray.prototype.slice(start, end)

_Compatible with [Array.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)_ but returns a Prray instance

The slice() method returns a shallow copy of a portion of a prray into a new prray object selected from begin to end (end not included) where begin and end represent the index of items in that prray. The original prray will not be modified.

#### Prray.prototype.includes(value)

_Compatible with [Array.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)_

The includes() method determines whether a prray includes a certain value among its entries, returning true or false as appropriate.

#### Prray.prototype.indexOf(value)

_Compatible with [Array.prototype.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)_

The indexOf() method returns the first index at which a given element can be found in the prray, or -1 if it is not present.

#### Prray.prototype.lastIndexOf(value)

_Compatible with [Array.prototype.lastIndexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)_

The lastIndexOf() method returns the last index at which a given element can be found in the prray, or -1 if it is not present. The prray is searched backwards, starting at fromIndex.

#### Prray.prototype.join(separator)

_Compatible with [Array.prototype.join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)_

The join() method creates and returns a new string by concatenating all of the elements in a prray (or an array-like object), separated by commas or a specified separator string. If the prray has only one item, then that item will be returned without using the separator.

#### Prray.prototype.keys()

_Compatible with [Array.prototype.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)_

The keys() method returns a new Array Iterator object that contains the keys for each index in the prray.

#### Prray.prototype.values()

_Compatible with [Array.prototype.values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values)_

The values() method returns a new Array Iterator object that contains the values for each index in the prray.

#### Prray.prototype.entries()

_Compatible with [Array.prototype.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)_

The entries() method returns a new Array Iterator object that contains the key/value pairs for each index in the prray.

#### Prray.prototype.fill(value, start, end)

_Compatible with [Array.prototype.fill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)_

The fill() method fills (modifies) all the elements of a prray from a start index (default zero) to an end index (default array length) with a static value. It returns the modified prray.

#### Prray.prototype.concat(arr)

_Compatible with [Array.prototype.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)_ but returns a Prray instance

The concat() method is used to merge two or more prrays and arrays. This method does not change the existing prrays, but instead returns a new prray.

#### Prray.prototype.copyWithin(target, star, end)

_Compatible with [Array.prototype.copyWithin](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)_

The copyWithin() method shallow copies part of a prray to another location in the same prray and returns it without modifying its length.

#### Prray.prototype.pop()

_Compatible with [Array.prototype.pop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)_

The pop() method removes the last element from a prray and returns that element. This method changes the length of the prray.

#### Prray.prototype.push(...elements)

_Compatible with [Array.prototype.push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)_

The push() method adds one or more elements to the end of a prray and returns the new length of the prray.

#### Prray.prototype.reverse()

_Compatible with [Array.prototype.reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)_

The reverse() method reverses a prray in place. The first prray element becomes the last, and the last prray element becomes the first.

#### Prray.prototype.shift()

_Compatible with [Array.prototype.shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)_

The shift() method removes the first element from a prray and returns that removed element. This method changes the length of the prray.

#### Prray.prototype.unshift(...elements)

_Compatible with [Array.prototype.unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)_

The unshift() method adds one or more elements to the beginning of a prray and returns the new length of the prray.

#### Prray.prototype.splice(start, deleteCount, ...items)

_Compatible with [Array.prototype.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)_ but returns a Prray instance.

The splice() method changes the contents of a prray by removing or replacing existing elements and/or adding new elements in place.

#### Prray.prototype.toString()

_Compatible with [Array.prototype.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)_

The toString() method returns a string representing the specified prray and its elements.

#### Prray.prototype.toLocaleString()

_Compatible with [Array.prototype.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)_

The toLocaleString() method returns a string representing the elements of the prray. The elements are converted to Strings using their toLocaleString methods and these Strings are separated by a locale-specific String (such as a comma “,”).

## Why not `bluebird`

Bluebird and prray have different concerns, so it may not be suitable for comparison. If you must compare, can also try:

1. Prray focuses on arrays, Bluebird focuses on promises
2. Bluebird has some methods such as `map`, but prray has more: `findAsync`, `everyAsync`, etc
3. Prray supports async method chaining, but for bluebird, you have to: `Bluebird.map(await Bluebird.map(arr,func1), func2)`
4. Prray is based on native promise implementation, and bluebird provides a good third-party promise implementation

## License

MIT

Prray -- "Promisified" Array, comes with async method supports(such as mapAsync). And it is compatible with normal array.

- comes with async method supports, such as `mapAsync`, `filterAsync`, `everyAsync` .etc
- supports **real async method chaining**
- **compatible** with normal array
- [well-tested](https://github.com/Bin-Huang/prray/tree/master/test) (coverage 93.17%)
- zero-dependency

> Prray aims to replace normal Array in some cases for convenience 😄😜.

```javascript
import { prray } from 'prray'

;(async () => {
  // Convert normal array to "prray"
  const prr = prray(['www.google.com', 'npmjs.org'])

  // Now you can do something like this
  const responses = await prr.mapAsync(fetch)

  // Async method chaining
  const htmls = await prr.mapAsync(fetch).mapAsync(r => r.text())

  // Method chaining with async and common methods
  await prr
    .map(commonFunc)
    .sortAsync(asyncFunc)
    .concat(['github.com', 'wikipedia.org'])
    .reverse()
    .splice(1, 2)
    .reduceAsync(asyncFunc2)
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

## Compatibility with normal Array

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
function func(arr: number[]) {
  return arr
}
func(new Prray(1,2,3))  // Type Prray is compatible with type Array
```

There are [a lots of unit tests](https://github.com/Bin-Huang/prray/tree/master/test) for prray to compatible with normal array.

## Distinguish between prray and normal array

```javascript
const prr = new Prray(1, 2, 3)
const arr = new Array(1, 2, 3)

Prray.isPrray(prr) // true
Prray.isPrray(arr) // false

prr instanceof Prray // true
arr instanceof Prray // false
```

## Usage

- Package exports
  - [prray(array)](#prrayarray)
  - [new Prray()](#new-prray)
- Prray static methods
  - [Prray.from(arrayLike)](#prrayfromarraylike)
  - [Prray.of(...args)](#prrayofargs)
  - [Prray.isPrray(obj)](#prrayisprrayobj)
- Prray instance methods
  - [Prray.prototype.mapAsync(func)](#prrayprototypemapasyncfunc)
  - [Prray.prototype.map(func)](#prrayprototypemapfunc)
  - [Prray.prototype.filterAsync(func)](#prrayprototypefilterasyncfunc)
  - [Prray.prototype.filter(func)](#prrayprototypefilterfunc)
  - [Prray.prototype.reduceAsync(func, initialValue)](#prrayprototypereduceasyncfunc-initialvalue)
  - [Prray.prototype.reduce(func, initialValue)](#prrayprototypereducefunc-initialvalue)
  - [Prray.prototype.reduceRightAsync(func, initialValue)](#prrayprototypereducerightasyncfunc-initialvalue)
  - [Prray.prototype.reduceRight(func, initialValue)](#prrayprototypereducerightfunc-initialvalue)
  - [Prray.prototype.findAsync(func)](#prrayprototypefindasyncfunc)
  - [Prray.prototype.find(func)](#prrayprototypefindfunc)
  - [Prray.prototype.findIndexAsync(func)](#prrayprototypefindindexasyncfunc)
  - [Prray.prototype.findIndex(func)](#prrayprototypefindindexfunc)
  - [Prray.prototype.everyAsync(func)](#prrayprototypeeveryasyncfunc)
  - [Prray.prototype.every(func)](#prrayprototypeeveryfunc)
  - [Prray.prototype.someAsync(func)](#prrayprototypesomeasyncfunc)
  - [Prray.prototype.some(func)](#prrayprototypesomefunc)
  - [Prray.prototype.sortAsync(func)](#prrayprototypesortasyncfunc)
  - [Prray.prototype.sort(func)](#prrayprototypesortfunc)
  - [Prray.prototype.forEachAsync(func)](#prrayprototypeforeachasyncfunc)
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
  - [Prray.prototype.toArray()](#prrayprototypetoarray)

#### prray(array)

The prray() method creates and returns a new Prray instance with every element in the array.

```javascript
import { prray } from 'prray'

const prr = prray([1, 2, 3])
```

#### new Prray()

The class `Prray`. You can think of it as class `Array`.

```javascript
import { Prray } from 'prray'

const p1 = new Prray()
const p2 = new Prray(1)
const p3 = new Prray('a', 'b')
```

**Instead `new Prray()`, use methods `prray`, `Prray.from` or `Prray.from` if you want to create a new prray instance**. Because the class Prray is so compatible with class Array,
some "weird" behavior that exists in `new Array()` can also occur: when you `new Array(1)`, you get `[ <1 empty item> ]` instead `[ 1 ]`.

#### Prray.from(arrayLike)

_Compatible with [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) but returns a prray._

The Prray.from() method creates a new, shallow-copied Prray instance from an array-like or iterable object.

```javascript
import { Prray } from 'prray'

const prr = Prray.from([1, 2, 3, 4])
```

#### Prray.of(...args)

_Compatible with [`Array.of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of) but returns a prray._

The Prray.of() method creates a new Prray instance from a variable number of arguments, regardless of number or type of the arguments.

```javascript
import { Prray } from 'prray'

const prr = Prray.of(1, 2, 3, 4)
```

#### Prray.isPrray(obj)

The Prray.isArray() method determines whether the passed value is a Prray.

```javascript
import { Prray } from 'prray'

Prray.isPrray([1, 2, 3]) // false
Prray.isPrray(new Prray(1, 2, 3)) // true
```

#### Prray.prototype.mapAsync(func)

_Think of it as async version of method `map`_

The mapAsync() method returns a promise resolved with a new prray with the resolved results of calling a provided async function on every element in the calling prray.

The provided async function is called on every element concurrently.

- `func(currentValue, index, prray)`

```javascript
const urls = prray([
  /* urls */
])

const jsons = await urls.mapAsync(fetch).mapAsync(res => res.json())
```

#### Prray.prototype.map(func)

_Compatible with [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)_

The map() method creates a new prray with the results of calling a provided function on every element in the calling prray.

#### Prray.prototype.filterAsync(func)

_Think of it as async version of method `filter`_

The filterAsync() method returns a promise resolved with a new prray with all elements that pass the test implemented by the provided async function.

The provided async function is called on every element concurrently.

```javascript
const files = prray([
  /* filenames */
])

await files.filterAsync(isFileExisted).mapAsync(removeFile)
```

#### Prray.prototype.filter(func)

_Compatible with [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)_

The filter() method creates a new prray with all elements that pass the test implemented by the provided function.

#### Prray.prototype.reduceAsync(func, initialValue)

_Think of it as async version of method `reduce`_

The reduceAsync() method executes a reducer function (that you provide) on each element of the prray, resulting in a single output value.

#### Prray.prototype.reduce(func, initialValue)

_Compatible with [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)_

The reduce() method executes a reducer function (that you provide) on each element of the prray, resulting in a single output value.

#### Prray.prototype.reduceRightAsync(func, initialValue)

_Think of it as async version of method `reduceRight`_

The reduceRightAsync() method applies a function against an accumulator and each value of the prray (from right-to-left) to reduce it to a single value.

#### Prray.prototype.reduceRight(func, initialValue)

_Compatible with [Array.prototype.reduceRight](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight)_

The reduceRight() method applies a function against an accumulator and each value of the prray (from right-to-left) to reduce it to a single value.

#### Prray.prototype.findAsync(func)

_Think of it as async version of method `find`_

The findAsync() method returns a promise resolved with the value of the first element in the provided prray that satisfies the provided async testing function.

The provided function can be an async function that returns a promise resolved with Boolean value.

```javascript
const workers = prray([
  /* workers */
])
const unhealthy = await workers.findAsync(checkHealth)
```

#### Prray.prototype.find(func)

_Compatible with [Array.prototype.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)_

The find() method returns the value of the first element in the provided prray that satisfies the provided testing function.

#### Prray.prototype.findIndexAsync(func)

_Think of it as async version of method `findIndex`_

The findIndexAsync() method returns a promise resolved with the index of the first element in the prray that satisfies the provided async testing function. Otherwise, it returns promise resolved with -1, indicating that no element passed the test.

The provided function can be an async function that returns a promise resolved with Boolean value.

```javascript
const workers = prray([
  /* workers */
])
const ix = await workers.findIndexAsync(checkHealth)
const unhealthy = workers[ix]
```

#### Prray.prototype.findIndex(func)

_Compatible with [Array.prototype.findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)_

The findIndex() method returns the index of the first element in the prray that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.

#### Prray.prototype.everyAsync(func)

_Think of it as async version of method `every`_

The everyAsync() method tests whether all elements in the prray pass the test implemented by the provided async function. It returns a promise resolved with a Boolean value.

The provided async function is called on every element concurrently.

```javascript
function checkFileAsync(filename) {
  return new Promise((resolve, reject) => {
    fs.access(filename, fs.F_OK, err => (err ? resolve(false) : resolve(true)))
  })
}

const filenames = prray([
  /* filenames */
])

const isAllFileExisted = await filenames.everyAsync(checkFileAsync)
```

#### Prray.prototype.every(func)

_Compatible with [Array.prototype.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)_

The every() method tests whether all elements in the prray pass the test implemented by the provided function. It returns a Boolean value.

#### Prray.prototype.someAsync(func)

_Think of it as async version of method `some`_

The some() method tests whether at least one element in the prray passes the test implemented by the provided async function. It returns a promise resolved with Boolean value.

The provided async function is called on every element concurrently.

```javascript
function checkFileAsync(filename) {
  return new Promise((resolve, reject) => {
    fs.access(filename, fs.F_OK, err => (err ? resolve(false) : resolve(true)))
  })
}

const filenames = prray([
  /* filenames */
])

const containExistedFile = await filenames.someAsync(checkFileAsync)
```

#### Prray.prototype.some(func)

_Compatible with [Array.prototype.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)_

The some() method tests whether at least one element in the prray passes the test implemented by the provided function. It returns a Boolean value.

#### Prray.prototype.sortAsync(func)

_Think of it as async version of method `sort`_

The sortAsync() method sorts the elements of a prray in place and returns the sorted prray. The provided function can be an async function that returns promise resolved with a number.

#### Prray.prototype.sort(func)

_Compatible with [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)_

The sort() method sorts the elements of a prray in place and returns the sorted prray. The default sort order is built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.

#### Prray.prototype.forEachAsync(func)

_Think of it as async version of method `forEach`_

The forEachAsync() method executes a provided function once for each prray element asynchronously and returns a promise resolved after all iterations resolved.

```javascript
const emails = prray([
  /* emails */
])
await emails.forEachAsync(sendAsync)
```

#### Prray.prototype.forEach(func)

_Compatible with [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)_

The forEach() method executes a provided function once for each prray element.

#### Prray.prototype.slice(start, end)

_Compatible with [Array.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)_

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

_Compatible with [Array.prototype.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)_

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

_Compatible with [Array.prototype.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)_

The splice() method changes the contents of a prray by removing or replacing existing elements and/or adding new elements in place.

#### Prray.prototype.toString()

_Compatible with [Array.prototype.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)_

The toString() method returns a string representing the specified prray and its elements.

#### Prray.prototype.toLocaleString()

_Compatible with [Array.prototype.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)_

The toLocaleString() method returns a string representing the elements of the prray. The elements are converted to Strings using their toLocaleString methods and these Strings are separated by a locale-specific String (such as a comma “,”).

#### Prray.prototype.toArray()

The toArray() method creates and returns a new normal array with every element in the prray.

```javascript
const prr = new Prray(1, 2, 3)

prr.toArray() // [1,2,3]
```

<!-- ## Different from [Bluebird](https://github.com/petkaantonov/bluebird)

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

If you want to handle asynchronous batch operations on data(array), prray is an option for you. -->

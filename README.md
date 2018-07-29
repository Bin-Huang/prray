🚀🚀🛸 An async version of `Array`, support async methods such as `mapAsync`, `filterAsync`, `reduceAsync`, `everyAsync`, `someAsync`, `findAsync`, `findIndexAsync` ...

You also can **chain method calls** even if them returns promise 😻!

```javascript
const p = require('prray')

(async () => {
  const urls = [ /* some urls */ ]

  await p(urls).mapAsync(saveToDB)

  await p(urls).mapAsync(fetch)
    .filterAsync(isExisted)
    .mapAsync(saveAsync)
})()
```

## Prray

Get a prray from existing array using function `p`

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

// equal to:

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

### reduceAsync(reducer, initialValue, concurrency?)

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

Prray has not yet reached version 1.0.0, which means there is still much work to be done, including but not limited to:

[x] Concurrency
- [ ] An appropriate logo
- [ ] Sub-task promise supports `timeout`, such like `await prr.mapAsync(fetch, {timeout: 3000})`
- [ ] Sub-task promise supports `retry` when rejected, such like `await prr.mapAsync(fetch, {retries: 2})`
- [ ] Browser compatibility survey
- [ ] Prettier document
- ...

So, welcome  `fork`, `Pull Request` and `Issues` if have any suggestions and bugs 

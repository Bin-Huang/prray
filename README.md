An async version of `Array`, support async methods such as `mapAsync`, `filterAsync`, `reduceAsync`, `everyAsync`, `someAsync`, `findAsync`, `findIndexAsync` ...

You also can **chain method calls** even if them returns promise!

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

Use function `p` to convert an array to prray.

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

你可以传入 `concurrency` 参数来限制异步并发数量，尤其是当你批处理一个很大的数组时，或者执行消耗资源的 async function，比如请求数据库。

```javascript
await p(arr).mapAsync(mapper, 10) // 最多挂起10个promise
```

## Compatible with Array

Prray 尽可能地兼容原生的 Array 数据结构，你可以在需要时放心地将 Array 转化成 Prray，甚至完全代替。

```javascript
const prr = p([1,2,3,4])

Array.isArray(prr) // true
prr instanceof Array // true
JSON.stringify(prr) === JSON.stringify([1,2,3,4])  // true
console.log(prr.map) // [Function]
console.log(prr.length) // 4

console.log(prr.mapAsync) // [Function]
```

在少数情况下，你可能需要原生的 Array 类型，这时你可以使用 toArray 方法转化

```javascript
const p = p([1,2,3])
console.log(p.toArray())  // [1,2,3]
```

## TODO
[x] concurrency 并发限速
- 更多的 async methods
- rejected 重试
- timeout 限时
- 逐步完善文档、翻译
- 浏览器兼容情况

async/promise 版的 Array，提供可接受 async function 参数的 mapAsync、filterAsync、reduceAsync 等方法，并且可以 **链状调用**。

```javascript
const p = require('prray')
const ids = [ /*some ids*/ ]

const prr = p(ids)
const vipUsers = await p.mapAsync(getUserFromDb)
  .filterAsync(isVipAsync)
```

```javascript
const p = require('prray')

(async () => {
  const urls = [ /* some urls */ ]
  await p(urls).mapAsync(fetch)
    .filterAsync(notExistInLocal)
    .mapAsync(download)
})

```

```javascript
const p = require('prray')
const request = require('request-promise')
const existInDB = require('./existInDB')

(async () => {
  const urls = [ /* some urls*/ ]
  const htmls = await p(urls).mapAsync(request)
    .filterAsync((html) => existInDB(html))
  console.log(htmls)
})()
```

## 兼容原生 Array
```javascript
const prr = p([1,2,3,4])
console.log(prr.mapAsync) // [Function]

console.log(Array.isArray(prr)) // true
console.log(prr instanceof Array) // true
console.log(JSON.stringify(prr) === JSON.stringify([1,2,3,4]))  // true
console.log(prr.map) // [Function]
console.log(prr.length) // 4
```

prray 最大可能地兼容原生 Array 数据结构，这意味着在绝大多数情况下你可以直接使用 prray 代替 Array。

在极少数情况下，你可能需要原生的 Array 类型，这是你可以使用 toArray 方法转化

```javascript
const p = p([1,2,3])
console.log(p.toArray())  // [1,2,3]
```

## 性能
不同于 bluebird 等工具包，prray 基于 ES6 后的原生 Promise，性能更有保障。

## TODO
concurrency 并发限速
rejected 重试
timeout 限时
everyAsync
...
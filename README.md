async/promise 版的 Array，提供可接受 async function 参数的 mapAsync、filterAsync、reduceAsync 等方法，并且可以 **链状调用**。

```javascript
const p = require('prray')

(async () => {
  const urls = [ /* some urls */ ]
  await p(urls).mapAsync(fetch).mapAsync(saveAsync)
})
```

## 链状调用

```javascript
await p(arr).filterAsync(existAsync).mapAsync(postAsync)

// 等价于：

let existed = await p(arr).filterAsync(existAsync)

await existed.mapAsync(postAsync)
```

# 方法
- mapAsync(mapper, concurrency?)
```javascript
await p(urls).mapAsync(fetch)
```
- filterAsync(filterer, concurrency?)
```javascript
await p(filenames).filterAsync(exists)
```
- reduceAsync(reducer, initialValue, concurrency?)
```javascript
await p(rules).reduceAsync(getRuleAsync, {})
```

## concurrency

你可以传入 `concurrency` 参数来限制异步并发数量，尤其是当你批处理一个很大的数组时，或者执行消耗资源的 async function，比如请求数据库。

```javascript
await p(arr).mapAsync(mapper, 10) // 最多挂起10个promise
```

## 兼容原生 Array

Prray 尽可能地兼容原生 Array 数据结构，这意味着在绝大多数情况下你可以直接使用 prray 代替 Array。

```javascript
const prr = p([1,2,3,4])
console.log(prr.mapAsync) // [Function]

console.log(Array.isArray(prr)) // true
console.log(prr instanceof Array) // true
console.log(JSON.stringify(prr) === JSON.stringify([1,2,3,4]))  // true
console.log(prr.map) // [Function]
console.log(prr.length) // 4
```

当然，你也完全可以只在需要的时候将 Array 转化成 Prray。

在极少数情况下，你可能需要原生的 Array 类型，这是你可以使用 toArray 方法转化

```javascript
const p = p([1,2,3])
console.log(p.toArray())  // [1,2,3]
```

## TODO
[x] concurrency 并发限速
- rejected 重试
- timeout 限时
- everyAsync
...（我还需要一个晚上的时间）
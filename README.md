```javascript
const tasks = ['2323', '2323']

const results = await P(tasks,  { concurrency: 10, retries: 4, timeout: 3000 })
  .map(getAsync)
  .filter(isImg)

const isAllPassed = await P(results).every(isPassed)

await P(urls)
  .map(getAsync, {concurrency: 10, retries: 4})
  .retries(2)
  .filter(isImg, {concurrency: 10, retries: 4})

await P(tasks).map(getAsync, 10)
```

```javascript
// Plan B
await P(tasks)
  .map(getAsync, {concurrency: 10, retries: 4})
  .filter(isImg, {concurrency: 10, retries: 4})
  .exec({ concurrenty: 10, retries: 10, perTimeout: 3000 })

await P(tasks).map(getAsync).exec(10)
await P.map(tasks, getAsync)
```

对比
```javascript
pMap(tasks, () => pRetry(() => doneshtome().timeout(2000).catch(console.log)), { concurrency: 20 })

tasks.mapAsync(tasks, { concurrency: 20, timeout: 3000, catch: console.log, retry: 30 })
```
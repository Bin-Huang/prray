import test from 'ava'
const prraypromise = require('../src/prraypromise')
const Prray = require('../src/prray')
const delay = require('delay')

test('array compatibility', (t) => {
  const p = new Prray(1,2,3,4)
  t.is(Array.isArray(p), true)
  t.is(p instanceof Prray, true)
  t.is(p instanceof Array, true)
  t.is(p.length, 4)
  t.deepEqual(p.map((i) => i + 1), new Prray(2,3,4,5))
  t.deepEqual([...p], [1,2,3,4])
  t.deepEqual(JSON.stringify(p), JSON.stringify([1,2,3,4]))

  let ix = 1 
  for (const item of p) {
    t.is(item, ix ++)
  }

  ix = 1 
  for (const item in p) {
    t.is(p[item], ix ++)
  }
})

const addAsync = (i) => delay(100).then(() => i + 1)

test('prraypromise map', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3,4]))
  t.deepEqual(await pp, [1,2,3,4])
  t.deepEqual(await pp.map(addAsync), [2,3,4,5])
  t.deepEqual(await pp.map(addAsync).map(addAsync, 2), [3,4,5,6])
})

test('prray map', async (t) => {
  const p = new Prray(1,2,3,4)
  t.deepEqual(await p.map(addAsync, 2), [2,3,4,5])
  t.deepEqual(await p.map(addAsync).map(addAsync), [3,4,5,6])
  t.deepEqual(await p.map(addAsync)
    .map(addAsync)
    .map(addAsync)
    .map(addAsync)
    .map(addAsync),
    [6,7,8,9])
})

const gt2Async = (i) => delay(200).then(() => i > 2)

test('prraypromise filter', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3,4]))
  t.deepEqual(await pp, [1,2,3,4])
  t.deepEqual(await pp.filter(gt2Async), [3,4])
  t.deepEqual(await pp.map(addAsync).filter(gt2Async, 2), [3,4,5])
})

test('prray filter', async (t) => {
  const p = new Prray(1,2,3,4)
  t.deepEqual(await p.filter(gt2Async, 2), [3,4])
  t.deepEqual(await p.map(addAsync).filter(gt2Async), [3,4,5])
  t.deepEqual(await p.filter(gt2Async).map(addAsync), [4,5])
})

const sumAsync = (sum, c) => delay(100).then(() => sum + c)

test('prraypromise reduce', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3,4]))
  t.deepEqual(await pp, [1,2,3,4])
  t.deepEqual(await pp.reduce(sumAsync, 0), 10)
  t.deepEqual(await pp.map(addAsync).reduce(sumAsync), 14)
})

test('prray reduce', async (t) => {
  const p = new Prray(1,2,3,4)
  t.deepEqual(await p.reduce(sumAsync, 0), 10)
  t.deepEqual(await p.filter(gt2Async).reduce(sumAsync), 7)
})

test('prraypromise toArray', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3,4]))
  t.deepEqual(await pp.toArray(), [1,2,3,4])
  t.deepEqual(await pp.map(addAsync).toArray(), [2,3,4,5])
})

test('prray toArray', async (t) => {
  const p = new Prray(1,2,3,4)
  t.deepEqual(await p.toArray(), [1,2,3,4])
  t.deepEqual(await p.filter(gt2Async).toArray(), [3,4])
})

const testAsync = (result) => delay(100).then(() => result)

test('prraypromise every', async (t) => {
  t.deepEqual(await prraypromise(Promise.resolve([true, true])).every(testAsync), true)
  t.deepEqual(await prraypromise(Promise.resolve([true, false])).every(testAsync), false)
  t.deepEqual(await prraypromise(Promise.resolve([false, false])).every(testAsync, 5), false)
  t.deepEqual(await prraypromise(Promise.resolve([true, true, false])).every(testAsync, 1), false)
})

test('prray every', async (t) => {
  t.deepEqual(await p([true, true]).every(testAsync), true)
  t.deepEqual(await p([false, true]).every(testAsync), false)
  t.deepEqual(await p([false, false]).every(testAsync, 5), false)
  t.deepEqual(await p([true, false, true]).every(testAsync, 2), false)
})

test('prraypromise some', async (t) => {
  t.deepEqual(await prraypromise(Promise.resolve([true, true])).some(testAsync), true)
  t.deepEqual(await prraypromise(Promise.resolve([true, false])).some(testAsync), true)
  t.deepEqual(await prraypromise(Promise.resolve([false, false])).some(testAsync, 5), false)
  t.deepEqual(await prraypromise(Promise.resolve([true, true, false])).some(testAsync, 1), true)
  t.deepEqual(await prraypromise(Promise.resolve([true, true, true])).some(testAsync), true)
})

test('prray some', async (t) => {
  t.deepEqual(await p([true, true]).some(testAsync), true)
  t.deepEqual(await p([false, true]).some(testAsync), true)
  t.deepEqual(await p([false, false]).some(testAsync, 5), false)
  t.deepEqual(await p([true, false, true]).some(testAsync, 2), true)
})

test('prraypromise find', async (t) => {
  t.deepEqual(await prraypromise(Promise.resolve([1, 2, 3])).find(gt2Async), 3)
  t.deepEqual(await prraypromise(Promise.resolve([0, 0])).find(gt2Async), null)
  t.deepEqual(await prraypromise(Promise.resolve([0, 2, 3])).find(gt2Async, 1), 3)
  t.deepEqual(await prraypromise(Promise.resolve([3])).find(gt2Async, 5), 3)
})

test('prray find', async (t) => {
  t.deepEqual(await p([0, 1]).find(gt2Async), null)
  t.deepEqual(await p([3]).find(gt2Async, 4), 3)
  t.deepEqual(await p([2, 3, 0, 1]).find(gt2Async, 5), 3)
})

test('prraypromise findIndex', async (t) => {
  t.deepEqual(await prraypromise(Promise.resolve([1, 2, 3])).findIndex(gt2Async), 2)
  t.deepEqual(await prraypromise(Promise.resolve([0, 0])).findIndex(gt2Async), -1)
  t.deepEqual(await prraypromise(Promise.resolve([0, 2, 3])).findIndex(gt2Async, 1), 2)
  t.deepEqual(await prraypromise(Promise.resolve([3])).findIndex(gt2Async, 5), 0)
})

test('prray findIndex', async (t) => {
  t.deepEqual(await p([0, 1]).findIndex(gt2Async), -1)
  t.deepEqual(await p([3]).findIndex(gt2Async, 4), 0)
  t.deepEqual(await p([2, 3, 0, 1]).findIndex(gt2Async, 5), 1)
})

const errorAsync = () => delay(100).then(() => {
  throw new Error('error')
})

test('prraypromise catch', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3,4]))
  t.deepEqual(await pp.map(errorAsync).catch(() => 110), 110)
  t.deepEqual(
    await pp.map((i) => errorAsync().catch(() => 0)).map(addAsync),
    [1,1,1,1]
  )
})

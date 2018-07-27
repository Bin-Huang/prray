import test from 'ava'
import { prraypromise } from '../src/prraypromise'
import { Prray } from '../src/prray'
import delay from 'delay'
import p from '../src';

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

const addAsync = (i: number) => delay(100).then(() => i + 1)

test('prraypromise mapAsync', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3,4]))
  t.deepEqual(await pp, [1,2,3,4])
  t.deepEqual(await pp.mapAsync(addAsync), [2,3,4,5])
  t.deepEqual(await pp.mapAsync(addAsync).mapAsync(addAsync, 2), [3,4,5,6])
})

test('prray mapAsync', async (t) => {
  const p = new Prray(1,2,3,4)
  t.deepEqual(await p.mapAsync(addAsync, 2), [2,3,4,5])
  t.deepEqual(await p.mapAsync(addAsync).mapAsync(addAsync), [3,4,5,6])
  t.deepEqual(await p.mapAsync(addAsync)
    .mapAsync(addAsync)
    .mapAsync(addAsync)
    .mapAsync(addAsync)
    .mapAsync(addAsync),
    [6,7,8,9])
})

const gt2Async = (i: number) => delay(200).then(() => i > 2)

test('prraypromise filterAsync', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3,4]))
  t.deepEqual(await pp, [1,2,3,4])
  t.deepEqual(await pp.filterAsync(gt2Async), [3,4])
  t.deepEqual(await pp.mapAsync(addAsync).filterAsync(gt2Async, 2), [3,4,5])
})

test('prray filterAsync', async (t) => {
  const p = new Prray(1,2,3,4)
  t.deepEqual(await p.filterAsync(gt2Async, 2), [3,4])
  t.deepEqual(await p.mapAsync(addAsync).filterAsync(gt2Async), [3,4,5])
  t.deepEqual(await p.filterAsync(gt2Async).mapAsync(addAsync), [4,5])
})

const sumAsync = (sum: number, c: number) => delay(100).then(() => sum + c)

test('prraypromise reduceAsync', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3,4]))
  t.deepEqual(await pp, [1,2,3,4])
  t.deepEqual(await pp.reduceAsync(sumAsync, 0), 10)
  t.deepEqual(await pp.mapAsync(addAsync).reduceAsync(sumAsync, 0, 2), 14)
})

test('prray reduceAsync', async (t) => {
  const p = new Prray(1,2,3,4)
  t.deepEqual(await p.reduceAsync(sumAsync, 0, 2), 10)
  t.deepEqual(await p.filterAsync(gt2Async).reduceAsync(sumAsync, 0), 7)
})

test('prraypromise toArray', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3,4]))
  t.deepEqual(await pp.toArray(), [1,2,3,4])
  t.deepEqual(await pp.mapAsync(addAsync).toArray(), [2,3,4,5])
})

test('prray toArray', async (t) => {
  const p = new Prray(1,2,3,4)
  t.deepEqual(await p.toArray(), [1,2,3,4])
  t.deepEqual(await p.filterAsync(gt2Async).toArray(), [3,4])
})

const testAsync = (result: boolean) => delay(100).then(() => result)

test('prraypromise everyAsync', async (t) => {
  t.deepEqual(await prraypromise(Promise.resolve([true, true])).everyAsync(testAsync), true)
  t.deepEqual(await prraypromise(Promise.resolve([true, false])).everyAsync(testAsync), false)
  t.deepEqual(await prraypromise(Promise.resolve([false, false])).everyAsync(testAsync, 5), false)
  t.deepEqual(await prraypromise(Promise.resolve([true, true, false])).everyAsync(testAsync, 1), false)
})

test('prray everyAsync', async (t) => {
  t.deepEqual(await p([true, true]).everyAsync(testAsync), true)
  t.deepEqual(await p([false, true]).everyAsync(testAsync), false)
  t.deepEqual(await p([false, false]).everyAsync(testAsync, 5), false)
  t.deepEqual(await p([true, false, true]).everyAsync(testAsync, 2), false)
})

const errorAsync = () => delay(100).then(() => {
  throw new Error('error')
})

test('prraypromise catch', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3,4]))
  t.deepEqual(await pp.mapAsync(errorAsync).catch(() => 110), 110)
  t.deepEqual(
    await pp.mapAsync((i) => errorAsync().catch(() => 0)).mapAsync(addAsync),
    [1,1,1,1]
  )
})

import test from 'ava'
import * as sinon from 'sinon'
import { delay, genRandArr, timer, isClose } from './test-utils'
import { loop } from '../src/methods'

test('loop with concurrency 100', async (t) => {
  const arr = genRandArr(1000)
  const record = timer()
  let running = 0
  await loop(arr, async () => {
    running ++
    await delay(100)
    t.true(running <= 100)
    running --
  }, { concurrency: 100 })
  t.true(isClose(record(), 10 * 100))
})

test('loop with concurrency infinity', async (t) => {
  const arr = genRandArr(1000)
  const record = timer()
  await loop(arr, () => delay(100), {})
  t.true(isClose(record(), 100))
})

test('loop with concurrency 1', async (t) => {
  const arr = genRandArr(100)
  const record = timer()
  await loop(arr, () => delay(10), { concurrency: 1 })
  t.true(isClose(record(), 10 * 100, { threshold: 200 }))
})

test('loop with break', async (t) => {
  const arr = [false, false, false, false, false, false, false, false] // length 8
  const record = timer()
  await loop(arr, async (v, ix, prr, breakLoop) => {
    if (ix >= 6) {
      breakLoop()
      return
    }
    prr[ix] = true
    await delay(100)
  }, { concurrency: 2 })
  t.true(isClose(record(), 300))
  t.deepEqual(arr, [true, true, true, true, true, true, false, false])
})

test('loop with unhandled error', async (t) => {
  const arr = [false, false, false, false, false, false, false, false] // length 8
  let isThrown = false
  const record = timer()
  try {
    await loop(arr, async (v, ix, prr) => {
      if (ix >= 6) {
        throw new Error('err')
      }
      prr[ix] = true
      await delay(100)
    }, { concurrency: 2 })
  } catch (e) {
    isThrown = true
  }
  t.true(isClose(record(), 300))
  t.deepEqual(arr, [true, true, true, true, true, true, false, false])
  t.true(isThrown)
})

test('loop with empty array', async (t) => {
  const record = timer()
  await loop([], () => delay(100), { concurrency: 10 })
  t.true(isClose(record(), 0))
})

test('loop with empty array, concurrency Infinity', async (t) => {
  const record = timer()
  await loop([], () => delay(100), {})
  t.true(isClose(record(), 0))
})

test('loop detail', async (t) => {
  const arr = ['a', 'b', 'c', 'd', 'e', 'f']
  const func = sinon.fake()
  await loop(arr, func, { concurrency: 2 })

  t.is(func.called, true)
  t.is(func.callCount, 6)

  t.is(func.args[0][0], 'a')
  t.is(func.args[0][1], 0)
  t.is(func.args[0][2], arr)

  t.is(func.args[1][0], 'b')
  t.is(func.args[1][1], 1)
  t.is(func.args[1][2], arr)

  t.is(func.args[2][0], 'c')
  t.is(func.args[2][1], 2)
  t.is(func.args[2][2], arr)

  t.is(func.args[3][0], 'd')
  t.is(func.args[3][1], 3)
  t.is(func.args[3][2], arr)

  t.is(func.args[4][0], 'e')
  t.is(func.args[4][1], 4)
  t.is(func.args[4][2], arr)

  t.is(func.args[5][0], 'f')
  t.is(func.args[5][1], 5)
  t.is(func.args[5][2], arr)
})

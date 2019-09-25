import test from 'ava'
import * as sinon from 'sinon'
import { prray } from '../src/prray'
import { prraypromise } from '../src/prraypromise'
import { delay } from './test-utils'

test('prray forEachAsync', async (t) => {
  const result1: number[] = []
  await prray([1,2,3]).forEachAsync(async (v) => {
    await delay(100)
    result1.push(v + 1)
  })
  t.deepEqual(result1, [2,3,4])

  const result2: number[] = []
  await prray([1,2,3]).forEachAsync((v) => {
    result2.push(v + 1)
  })
  t.deepEqual(result2, [2,3,4])
})

test('prraypromise forEachAsync', async (t) => {
  const result1: number[] = []
  await prraypromise(Promise.resolve([1,2,3])).forEachAsync(async (v) => {
    await delay(100)
    result1.push(v + 1)
  })
  t.deepEqual(result1, [2,3,4])

  const result2: number[] = []
  await prraypromise(Promise.resolve([1,2,3])).forEachAsync((v) => {
    result2.push(v + 1)
  })
  t.deepEqual(result2, [2,3,4])
})

test('prray forEachAsync compatibility', async (t) => {
  const func = sinon.fake()
  const prr = prray(['a', 'b', 'c'])
  await prr.forEachAsync(func)

  t.is(func.called, true)
  t.is(func.callCount, 3)

  t.is(func.args[0][0], 'a')
  t.is(func.args[0][1], 0)
  t.is(func.args[0][2], prr)

  t.is(func.args[1][0], 'b')
  t.is(func.args[1][1], 1)
  t.is(func.args[1][2], prr)

  t.is(func.args[2][0], 'c')
  t.is(func.args[2][1], 2)
  t.is(func.args[2][2], prr)
})

test('prraypromise forEachAsync compatibility', async (t) => {
  const func = sinon.fake()
  const p = prraypromise(Promise.resolve(['a', 'b', 'c']))
  await p.forEachAsync(func)

  t.is(func.called, true)
  t.is(func.callCount, 3)

  t.is(func.args[0][0], 'a')
  t.is(func.args[0][1], 0)
  t.deepEqual(func.args[0][2], prray(['a', 'b', 'c']))

  t.is(func.args[1][0], 'b')
  t.is(func.args[1][1], 1)
  t.deepEqual(func.args[1][2], prray(['a', 'b', 'c']))

  t.is(func.args[2][0], 'c')
  t.is(func.args[2][1], 2)
  t.deepEqual(func.args[2][2], prray(['a', 'b', 'c']))
})

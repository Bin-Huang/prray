import test from 'ava'
import * as sinon from 'sinon'
import Prray from '../src/prray'
import { toPrrayPromise, delay } from './test-utils'

test('prray forEachAsync', async t => {
  const result1: number[] = []
  await Prray.from([1, 2, 3]).forEachAsync(async v => {
    await delay(100)
    result1.push(v + 1)
  })
  t.deepEqual(result1, [2, 3, 4])

  const result2: number[] = []
  await Prray.from([1, 2, 3]).forEachAsync(v => {
    result2.push(v + 1)
  })
  t.deepEqual(result2, [2, 3, 4])

  await Prray.from([1, 2, 3]).forEachAsync(
    async v => {
      await delay(100)
      result1.push(v + 1)
    },
    { concurrency: 1 },
  )
})

test('prraypromise forEachAsync', async t => {
  const result1: number[] = []
  await toPrrayPromise([1, 2, 3]).forEachAsync(async v => {
    await delay(100)
    result1.push(v + 1)
  })
  t.deepEqual(result1, [2, 3, 4])

  const result2: number[] = []
  await toPrrayPromise([1, 2, 3]).forEachAsync(v => {
    result2.push(v + 1)
  })
  t.deepEqual(result2, [2, 3, 4])
})

test('prray forEachAsync compatibility', async t => {
  const func = sinon.fake()
  const prr = Prray.from(['a', 'b', 'c'])
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

test('prraypromise forEachAsync compatibility', async t => {
  const func = sinon.fake()
  const p = toPrrayPromise(['a', 'b', 'c'])
  await p.forEachAsync(func)

  t.is(func.called, true)
  t.is(func.callCount, 3)

  t.is(func.args[0][0], 'a')
  t.is(func.args[0][1], 0)
  t.deepEqual(func.args[0][2], Prray.from(['a', 'b', 'c']))

  t.is(func.args[1][0], 'b')
  t.is(func.args[1][1], 1)
  t.deepEqual(func.args[1][2], Prray.from(['a', 'b', 'c']))

  t.is(func.args[2][0], 'c')
  t.is(func.args[2][1], 2)
  t.deepEqual(func.args[2][2], Prray.from(['a', 'b', 'c']))

  await p.forEachAsync(func, { concurrency: 2 })
})

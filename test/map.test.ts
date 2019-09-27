import test from 'ava'
import * as sinon from 'sinon'
import { prray, Prray } from '../src/prray'
import { PrrayPromise } from '../src/prraypromise'
import { toPrrayPromise, addOneAsync, addOne } from './test-utils'

test('prray map', async (t) => {
  const p = prray([1,2,3])
  const result = p.map(addOne)

  t.true(result instanceof Prray)
  t.deepEqual(result, prray([2,3,4]))
})

test('prray map with async callback', async (t) => {
  const p = prray([1,2,3])
  const result = p.map(addOneAsync)

  t.true(result instanceof Prray)
  t.true(result[0] instanceof Promise)
  t.deepEqual(await Promise.all(result), [2,3,4])
})

test('prraypromise map', async (t) => {
  const pp = toPrrayPromise([1,2,3])
  const result = pp.map(addOne)

  t.true(result instanceof PrrayPromise)
  t.deepEqual(await result, prray([2,3,4]))
})

test('prraypromise map with async callback', async (t) => {
  const p = toPrrayPromise([1,2,3])
  const result = p.map(addOneAsync)
  t.true(result instanceof PrrayPromise)
  const resolved = await result
  t.true(resolved[0] instanceof Promise)
  t.deepEqual(await Promise.all(resolved), [2,3,4])
})

test('prray map detail', async (t) => {
  const prr = prray(['a', 'b', 'c'])
  const func = sinon.fake()

  prr.map(func)

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

test('prraypromise map detail', async (t) => {
  const prr = prray(['a', 'b', 'c'])
  const prom = toPrrayPromise(prr)
  const func = sinon.fake()

  await prom.map(func)

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
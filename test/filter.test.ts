import test from 'ava'
import * as sinon from 'sinon'
import { prray, Prray } from '../src/prray'
import { PrrayPromise } from '../src/prraypromise'
import { toPrrayPromise, isEven } from './test-utils'

test('prray filter', async t => {
  const p = prray([1, 2, 3, 4])
  const result = p.filter(isEven)

  t.true(result instanceof Prray)
  t.deepEqual(result, prray([2, 4]))
})

test('prraypromise filter', async t => {
  const pp = toPrrayPromise([1, 2, 3, 4])
  const result = pp.filter(isEven)

  t.true(result instanceof PrrayPromise)
  t.deepEqual(await result, prray([2, 4]))
})

test('prray filter detail', async t => {
  const prr = prray(['a', 'b', 'c'])
  const func = sinon.fake()

  prr.filter(func)

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

test('prraypromise filter detail', async t => {
  const prr = prray(['a', 'b', 'c'])
  const prom = toPrrayPromise(prr)
  const func = sinon.fake()

  await prom.filter(func)

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

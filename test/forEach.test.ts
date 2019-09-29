import test from 'ava'
import * as sinon from 'sinon'
import { prray } from '../src/prray'
import { toPrrayPromise } from './test-utils'

test('prray forEach compatibility', async (t) => {
  const func = sinon.fake()
  const prr = prray(['a', 'b', 'c'])
  prr.forEach(func)

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

test('prraypromise forEach compatibility', async (t) => {
  const func = sinon.fake()
  const p = toPrrayPromise(['a', 'b', 'c'])
  await p.forEach(func)

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

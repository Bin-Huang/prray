import test from 'ava'
import * as sinon from 'sinon'
import Prray from '../src/prray'
import { toPrrayPromise, isEven } from './test-utils'

test('prray some', async t => {
  t.is(Prray.from([1, 2, 3]).some(isEven), true)
  t.is(Prray.from([1, 3, 5]).some(isEven), false)
})

test('prraypromise some', async t => {
  t.is(await toPrrayPromise([1, 2, 3]).some(isEven), true)
  t.is(await toPrrayPromise([1, 3, 5]).some(isEven), false)
})

test('prray some compatibility 1', async t => {
  const func = sinon.fake(() => false)
  const prr = Prray.from(['a', 'b', 'c'])
  prr.some(func)

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

test('prray some compatibility 2', async t => {
  const func = sinon.fake(() => true)
  const prr = Prray.from(['a', 'b', 'c'])
  prr.some(func)

  t.is(func.callCount, 1)
})

test('prraypromise some compatibility 1', async t => {
  const func = sinon.fake(() => false)
  const prr = Prray.from(['a', 'b', 'c'])
  const pp = toPrrayPromise(prr)
  await pp.some(func)

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

test('prraypromise some compatibility 2', async t => {
  const func = sinon.fake(() => true)
  const prr = Prray.from(['a', 'b', 'c'])
  const pp = toPrrayPromise(prr)
  await pp.some(func)

  t.is(func.callCount, 1)
})

import test from 'ava'
import Prray from '../src/prray'
import { toPrrayPromise } from './test-utils'

const arr = ['a', 'b', 'c', 'd']

test('prray shift', async t => {
  const p = Prray.from(arr)

  t.is(p.shift(), 'a')
  t.is(p.shift(), 'b')
  t.is(p.shift(), 'c')
  t.is(p.shift(), 'd')
  t.is(p.shift(), undefined)

  t.deepEqual(p, Prray.from([])) // mutable
})

test('prraypromise shift', async t => {
  const prr = Prray.from(arr)
  const pp = toPrrayPromise(prr)

  t.is(await pp.shift(), 'a')
  t.is(await pp.shift(), 'b')
  t.is(await pp.shift(), 'c')
  t.is(await pp.shift(), 'd')
  t.is(await pp.shift(), undefined)

  t.deepEqual(prr, Prray.from([])) // mutable
})

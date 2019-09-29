import test from 'ava'
import { prray } from '../src/prray'
import { toPrrayPromise } from './test-utils'

const arr = ['a', 'b', 'c', 'd']

test('prray shift', async (t) => {
  const p = prray(arr)

  t.is(p.shift(), 'a')
  t.is(p.shift(), 'b')
  t.is(p.shift(), 'c')
  t.is(p.shift(), 'd')
  t.is(p.shift(), undefined)

  t.deepEqual(p, prray([]))
})

test('prraypromise shift', async (t) => {
  const prr = prray(arr)
  const pp = toPrrayPromise(prr)

  t.is(await pp.shift(), 'a')
  t.is(await pp.shift(), 'b')
  t.is(await pp.shift(), 'c')
  t.is(await pp.shift(), 'd')
  t.is(await pp.shift(), undefined)

  t.deepEqual(prr, prray([]))
})

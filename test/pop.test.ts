import test from 'ava'
import Prray from '../src/prray'
import { toPrrayPromise } from './test-utils'

const arr = ['a', 'b', 'c', 'd']

test('prray pop', async t => {
  const p = Prray.from(arr)

  t.is(p.pop(), 'd')
  t.is(p.pop(), 'c')
  t.is(p.pop(), 'b')
  t.is(p.pop(), 'a')
  t.is(p.pop(), undefined)

  t.deepEqual(p, Prray.from([])) // mutable
})

test('prraypromise pop', async t => {
  const pp = toPrrayPromise(arr)

  t.is(await pp.pop(), 'd')
  t.is(await pp.pop(), 'c')
  t.is(await pp.pop(), 'b')
  t.is(await pp.pop(), 'a')
  t.is(await pp.pop(), undefined)

  t.deepEqual(await pp, Prray.from([])) // mutable
})

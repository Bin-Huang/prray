import test from 'ava'
import { prray } from '../src/prray'
import { toPrrayPromise } from './test-utils'

const arr = ['a', 'b', 'c', 'd']

test('prray pop', async (t) => {
  const p = prray(arr)

  t.is(p.pop(), 'd')
  t.is(p.pop(), 'c')
  t.is(p.pop(), 'b')
  t.is(p.pop(), 'a')
  t.is(p.pop(), undefined)
})

test('prraypromise pop', async (t) => {
  const pp = toPrrayPromise(arr)

  t.is(await pp.pop(), 'd')
  t.is(await pp.pop(), 'c')
  t.is(await pp.pop(), 'b')
  t.is(await pp.pop(), 'a')
  t.is(await pp.pop(), undefined)
})

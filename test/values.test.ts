import test from 'ava'
import { prray } from '../src/prray'
import { toPrrayPromise } from './test-utils'

const arr = ['a', 'b', 'c', 'd']
const p = prray(arr)
const pp = toPrrayPromise(arr)

test('prray values', async (t) => {
  const i = p.values()
  t.is(typeof i.next, 'function')
  t.is(i.next().value, 'a')
  t.is(i.next().value, 'b')
  t.is(i.next().value, 'c')
  t.is(i.next().value, 'd')
  t.is(i.next().done, true)
})

test('prraypromise values', async (t) => {
  const i = await pp.values()
  t.is(typeof i.next, 'function')
  t.is(i.next().value, 'a')
  t.is(i.next().value, 'b')
  t.is(i.next().value, 'c')
  t.is(i.next().value, 'd')
  t.is(i.next().done, true)
})

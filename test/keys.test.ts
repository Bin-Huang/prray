import test from 'ava'
import { prray } from '../src/prray'
import { toPrrayPromise } from './test-utils'

const arr = ['a', 'b', 'c', 'd']
const p = prray(arr)
const pp = toPrrayPromise(arr)

test('prray keys', async t => {
  const i = p.keys()
  t.is(typeof i.next, 'function')
  t.is(i.next().value, 0)
  t.is(i.next().value, 1)
  t.is(i.next().value, 2)
  t.is(i.next().value, 3)
  t.is(i.next().done, true)
})

test('prraypromise keys', async t => {
  const i = await pp.keys()
  t.is(typeof i.next, 'function')
  t.is(i.next().value, 0)
  t.is(i.next().value, 1)
  t.is(i.next().value, 2)
  t.is(i.next().value, 3)
  t.is(i.next().done, true)
})

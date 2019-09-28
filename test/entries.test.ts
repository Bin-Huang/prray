import test from 'ava'
import { prray } from '../src/prray'
import { toPrrayPromise } from './test-utils'

const arr = ['a', 'b', 'c', 'd']
const p = prray(arr)
const pp = toPrrayPromise(arr)

test('prray entries', async (t) => {
  const i = p.entries()
  t.is(typeof i.next, 'function')
  t.deepEqual(i.next().value, [0, 'a'])
  t.deepEqual(i.next().value, [1, 'b'])
  t.deepEqual(i.next().value, [2, 'c'])
  t.deepEqual(i.next().value, [3, 'd'])
  t.is(i.next().done, true)
})

test('prraypromise entries', async (t) => {
  const i = await pp.entries()
  t.is(typeof i.next, 'function')
  t.deepEqual(i.next().value, [0, 'a'])
  t.deepEqual(i.next().value, [1, 'b'])
  t.deepEqual(i.next().value, [2, 'c'])
  t.deepEqual(i.next().value, [3, 'd'])
  t.is(i.next().done, true)
})

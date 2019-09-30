import test from 'ava'
import { prray, Prray } from '../src/prray'
import { toPrrayPromise } from './test-utils'

const arr = ['a', 'b', 'c', 'd']
const prr = prray(arr)
const pp = toPrrayPromise(arr)

test('prray toArray', async (t) => {
  t.true(prr.toArray() instanceof Array)
  t.false(prr.toArray() instanceof Prray)
  t.deepEqual(prr.toArray(), arr)
})

test('prraypromise toArray', async (t) => {
  t.true(await pp.toArray() instanceof Array)
  t.false(await pp.toArray() instanceof Prray)
  t.deepEqual(await pp.toArray(), arr)
})

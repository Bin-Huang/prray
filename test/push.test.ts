import test from 'ava'
import { prray } from '../src/prray'
import { toPrrayPromise } from './test-utils'

const arr = ['a', 'b']

test('prray push', async t => {
  const prr = prray(arr)

  t.is(prr.push('c'), 3)
  t.is(prr.push('d', 'e'), 5)
  t.deepEqual(prr, prray(['a', 'b', 'c', 'd', 'e']))
})

test('prraypromise push', async t => {
  const prr = prray(arr)
  const pp = toPrrayPromise(prr)

  t.is(await pp.push('c'), 3)
  t.is(await pp.push('d', 'e'), 5)
  t.deepEqual(prr, prray(['a', 'b', 'c', 'd', 'e']))
})

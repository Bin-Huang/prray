import test from 'ava'
import { prray } from '../src/prray'
import { PrrayPromise } from '../src/prraypromise'
import { toPrrayPromise } from './test-utils'

const arr = [1, 2, 3, 4]

test('prray reverse', async t => {
  const prr = prray(arr)

  t.deepEqual(prr.reverse(), prray([4, 3, 2, 1]))
  t.deepEqual(prr, prray([4, 3, 2, 1]))
})

test('prraypromise reverse', async t => {
  const prr = prray(arr)
  const pp = toPrrayPromise(prr)

  t.deepEqual(await pp.reverse(), prray([4, 3, 2, 1]))
  t.deepEqual(prr, prray([4, 3, 2, 1]))
  t.true(pp.reverse() instanceof PrrayPromise)
})

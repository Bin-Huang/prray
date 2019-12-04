import test from 'ava'
import Prray from '../src/prray'
import { PrrayPromise } from '../src/prraypromise'
import { toPrrayPromise } from './test-utils'

const arr = [1, 2, 3, 4]

test('prray reverse', async t => {
  const prr = Prray.from(arr)

  t.deepEqual(prr.reverse(), Prray.from([4, 3, 2, 1]))
  t.deepEqual(prr, Prray.from([4, 3, 2, 1])) // mutable
})

test('prraypromise reverse', async t => {
  const prr = Prray.from(arr)
  const pp = toPrrayPromise(prr)

  t.deepEqual(await pp.reverse(), Prray.from([4, 3, 2, 1]))
  t.deepEqual(prr, Prray.from([4, 3, 2, 1])) // mutable
  t.true(pp.reverse() instanceof PrrayPromise)
})

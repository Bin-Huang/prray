import test from 'ava'
import Prray from '../src/prray'
import { toPrrayPromise } from './test-utils'

test('prray copyWithin', async t => {
  const arr = [1, 2, 3, 4, 5]
  const prr = Prray.from([1, 2, 3, 4, 5])

  t.is(prr.copyWithin(-2, 0), prr)

  t.deepEqual(prr.copyWithin(-2, 0), Prray.from(arr.copyWithin(-2, 0)))
  t.deepEqual(prr.copyWithin(0, 3), Prray.from(arr.copyWithin(0, 3)))
  t.deepEqual(prr.copyWithin(0, 3, 4), Prray.from(arr.copyWithin(0, 3, 4)))
  t.deepEqual(prr.copyWithin(-2, -3, -1), Prray.from(arr.copyWithin(-2, -3, -1)))

  t.is(prr.copyWithin(-2, -3, -1), prr) // mutable
})

test('prraypromise copyWithin', async t => {
  const arr = [1, 2, 3, 4, 5]
  const prr = Prray.from([1, 2, 3, 4, 5])

  t.is(await toPrrayPromise(prr).copyWithin(-2, 0), prr)

  t.deepEqual(await toPrrayPromise(prr).copyWithin(-2, 0), Prray.from(arr.copyWithin(-2, 0)))
  t.deepEqual(await toPrrayPromise(prr).copyWithin(0, 3), Prray.from(arr.copyWithin(0, 3)))
  t.deepEqual(await toPrrayPromise(prr).copyWithin(0, 3, 4), Prray.from(arr.copyWithin(0, 3, 4)))
  t.deepEqual(await toPrrayPromise(prr).copyWithin(-2, -3, -1), Prray.from(arr.copyWithin(-2, -3, -1)))

  t.is(await toPrrayPromise(prr).copyWithin(-2, -3, -1), prr) // mutable
})

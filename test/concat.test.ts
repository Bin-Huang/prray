import test from 'ava'
import { prray } from '../src/prray'
import { toPrrayPromise } from './test-utils'

test('prray concat', async t => {
  t.deepEqual(prray([1, 2]).concat([3, 4]), prray([1, 2, 3, 4]))
  t.deepEqual(prray([1, 2]).concat([3, 4], [5, 6]), prray([1, 2, 3, 4, 5, 6]))
  t.deepEqual(prray([1, 2]).concat(3, [4, 5]), prray([1, 2, 3, 4, 5]))
  t.deepEqual(prray([[1]]).concat([2, [3]] as any), prray([[1], 2, [3]]))
  t.deepEqual(prray([[1]]).concat(4 as any, [5, [6]] as any), prray([[1], 4, 5, [6]]))

  const prr = prray([1, 2])
  t.not(prr.concat([3, 4]), prr) // Immutable
})

test('prraypromise concat', async t => {
  t.deepEqual(await toPrrayPromise([1, 2]).concat([3, 4]), prray([1, 2, 3, 4]))
  t.deepEqual(await toPrrayPromise([1, 2]).concat([3, 4], [5, 6]), prray([1, 2, 3, 4, 5, 6]))
  t.deepEqual(await toPrrayPromise([1, 2]).concat(3, [4, 5]), prray([1, 2, 3, 4, 5]))
  t.deepEqual(await toPrrayPromise([[1]]).concat([2, [3]] as any), prray([[1], 2, [3]]))
  t.deepEqual(await toPrrayPromise([[1]]).concat(4 as any, [5, [6]] as any), prray([[1], 4, 5, [6]]))

  const prr = prray([1, 2])
  t.not(await toPrrayPromise(prr).concat([3, 4]), prr) // Immutable
})

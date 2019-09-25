import test from 'ava'
import { prray } from '../src/prray'
import { prraypromise, PrrayPromise } from '../src/prraypromise'
import { addOneAsync, addOne } from './test-utils'

test('prray mapAsync', async (t) => {
  const p = prray([1,2,3])

  t.true(p.mapAsync(addOneAsync) instanceof PrrayPromise)
  t.true(p.mapAsync(addOne) instanceof PrrayPromise)

  t.deepEqual(await p.mapAsync(addOneAsync), prray([2,3,4]))
  t.deepEqual(await p.mapAsync(addOne), prray([2,3,4]))
})

test('prraypromise mapAsync', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3]))

  t.true(pp.mapAsync(addOneAsync) instanceof PrrayPromise)
  t.true(pp.mapAsync(addOne) instanceof PrrayPromise)

  t.deepEqual(await pp.mapAsync(addOneAsync), prray([2,3,4]))
  t.deepEqual(await pp.mapAsync(addOne), prray([2,3,4]))
})

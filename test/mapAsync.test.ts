import test from 'ava'
import Prray from '../src/prray'
import { PrrayPromise } from '../src/prraypromise'
import { toPrrayPromise, addOneAsync, addOne } from './test-utils'

test('prray mapAsync', async t => {
  const p = Prray.from([1, 2, 3])

  t.true(p.mapAsync(addOneAsync) instanceof PrrayPromise)
  t.true(p.mapAsync(addOne) instanceof PrrayPromise)

  t.deepEqual(await p.mapAsync(addOneAsync), Prray.from([2, 3, 4]))
  t.deepEqual(await p.mapAsync(addOne), Prray.from([2, 3, 4]))

  t.deepEqual(await p.mapAsync(addOneAsync, { concurrency: 2 }), Prray.from([2, 3, 4]))
})

test('prraypromise mapAsync', async t => {
  const pp = toPrrayPromise([1, 2, 3])

  t.true(pp.mapAsync(addOneAsync) instanceof PrrayPromise)
  t.true(pp.mapAsync(addOne) instanceof PrrayPromise)

  t.deepEqual(await pp.mapAsync(addOneAsync), Prray.from([2, 3, 4]))
  t.deepEqual(await pp.mapAsync(addOne), Prray.from([2, 3, 4]))

  t.deepEqual(await pp.mapAsync(addOneAsync, { concurrency: 2 }), Prray.from([2, 3, 4]))
})

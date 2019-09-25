import test from 'ava'
import { prray } from '../src/prray'
import { PrrayPromise } from '../src/prraypromise'
import { toPrrayPromise, isEven, isEvenAsync } from './test-utils'

test('prray filterAsync', async (t) => {
  const p = prray([1,2,3,4])

  t.true(p.filterAsync(isEvenAsync) instanceof PrrayPromise)
  t.true(p.filterAsync(isEven) instanceof PrrayPromise)

  t.deepEqual(await p.filterAsync(isEvenAsync), prray([2,4]))
  t.deepEqual(await p.filterAsync(isEven), prray([2,4]))
})

test('prraypromise filterAsync', async (t) => {
  const pp = toPrrayPromise([1,2,3,4])

  t.true(pp.filterAsync(isEvenAsync) instanceof PrrayPromise)
  t.true(pp.filterAsync(isEven) instanceof PrrayPromise)

  t.deepEqual(await pp.filterAsync(isEvenAsync), prray([2,4]))
  t.deepEqual(await pp.filterAsync(isEven), prray([2,4]))
})

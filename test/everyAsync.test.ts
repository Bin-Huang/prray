import test from 'ava'
import { prray } from '../src/prray'
import { toPrrayPromise, isGte3, isGte3Async } from './test-utils'

const p1 = prray([3,4])
const p2 = prray([1,2,3])

const pp1 = toPrrayPromise([3,4])
const pp2 = toPrrayPromise([1,2,3])

test('prray everyAsync', async (t) => {
  t.true(p1.everyAsync(isGte3Async) instanceof Promise)
  t.true(p1.everyAsync(isGte3) instanceof Promise)

  t.is(await p1.everyAsync(isGte3Async), true)
  t.is(await p2.everyAsync(isGte3Async), false)

  t.is(await p1.everyAsync(isGte3), true)
  t.is(await p2.everyAsync(isGte3), false)
})

test('prraypromise everyAsync', async (t) => {
  t.true(pp1.everyAsync(isGte3Async) instanceof Promise)
  t.true(pp1.everyAsync(isGte3) instanceof Promise)

  t.is(await pp1.everyAsync(isGte3Async), true)
  t.is(await pp2.everyAsync(isGte3Async), false)

  t.is(await pp1.everyAsync(isGte3), true)
  t.is(await pp2.everyAsync(isGte3), false)
})

import test from 'ava'
import { prray } from '../src/prray'
import { prraypromise } from '../src/prraypromise'
import { isGte3, isGte3Async } from './test-utils'

const p1 = prray([1,2,3])
const p2 = prray([0,2])

const pp1 = prraypromise(Promise.resolve([1,2,3]))
const pp2 = prraypromise(Promise.resolve([0,2]))

test('prray findAsync', async (t) => {
  t.true(p1.findAsync(isGte3Async) instanceof Promise)
  t.true(p1.findAsync(isGte3) instanceof Promise)

  t.is(await p1.findAsync(isGte3Async), 3)
  t.is(await p2.findAsync(isGte3Async), undefined)

  t.is(await p1.findAsync(isGte3), 3)
  t.is(await p2.findAsync(isGte3), undefined)
})

test('prraypromise findAsync', async (t) => {
  t.true(pp1.findAsync(isGte3Async) instanceof Promise)
  t.true(pp1.findAsync(isGte3) instanceof Promise)

  t.is(await pp1.findAsync(isGte3Async), 3)
  t.is(await pp2.findAsync(isGte3Async), undefined)

  t.is(await pp1.findAsync(isGte3), 3)
  t.is(await pp2.findAsync(isGte3), undefined)
})

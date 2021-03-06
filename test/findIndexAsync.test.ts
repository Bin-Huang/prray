import test from 'ava'
import Prray from '../src/prray'
import { toPrrayPromise, isGte3, isGte3Async } from './test-utils'

const p1 = Prray.from([1, 2, 3])
const p2 = Prray.from([0, 2])

const pp1 = toPrrayPromise([1, 2, 3])
const pp2 = toPrrayPromise([0, 2])

test('prray findIndexAsync', async t => {
  t.true(p1.findIndexAsync(isGte3Async) instanceof Promise)
  t.true(p1.findIndexAsync(isGte3) instanceof Promise)

  t.is(await p1.findIndexAsync(isGte3Async), 2)
  t.is(await p2.findIndexAsync(isGte3Async), -1)

  t.is(await p1.findIndexAsync(isGte3), 2)
  t.is(await p2.findIndexAsync(isGte3), -1)
})

test('prraypromise findIndexAsync', async t => {
  t.true(pp1.findIndexAsync(isGte3Async) instanceof Promise)
  t.true(pp1.findIndexAsync(isGte3) instanceof Promise)

  t.is(await pp1.findIndexAsync(isGte3Async), 2)
  t.is(await pp2.findIndexAsync(isGte3Async), -1)

  t.is(await pp1.findIndexAsync(isGte3), 2)
  t.is(await pp2.findIndexAsync(isGte3), -1)
})

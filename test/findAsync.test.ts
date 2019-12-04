import test from 'ava'
import Prray from '../src/prray'
import { toPrrayPromise, isGte3, isGte3Async } from './test-utils'

const p1 = Prray.from([1, 2, 3])
const p2 = Prray.from([0, 2])

const pp1 = toPrrayPromise([1, 2, 3])
const pp2 = toPrrayPromise([0, 2])

test('prray findAsync', async t => {
  t.true(p1.findAsync(isGte3Async) instanceof Promise)
  t.true(p1.findAsync(isGte3) instanceof Promise)

  t.is(await p1.findAsync(isGte3Async), 3)
  t.is(await p2.findAsync(isGte3Async), undefined)

  t.is(await p1.findAsync(isGte3), 3)
  t.is(await p2.findAsync(isGte3), undefined)
})

test('prraypromise findAsync', async t => {
  t.true(pp1.findAsync(isGte3Async) instanceof Promise)
  t.true(pp1.findAsync(isGte3) instanceof Promise)

  t.is(await pp1.findAsync(isGte3Async), 3)
  t.is(await pp2.findAsync(isGte3Async), undefined)

  t.is(await pp1.findAsync(isGte3), 3)
  t.is(await pp2.findAsync(isGte3), undefined)
})

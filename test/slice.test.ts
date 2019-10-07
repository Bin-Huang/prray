import test from 'ava'
import { prray, Prray } from '../src/prray'
import { PrrayPromise } from '../src/prraypromise'
import { toPrrayPromise } from './test-utils'

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const p = prray(arr)
const pp = toPrrayPromise(arr)

test('prray slice', async t => {
  t.true(p.slice(1) instanceof Prray)

  t.deepEqual(p.slice(), prray(arr.slice()))

  t.deepEqual(p.slice(2), prray(arr.slice(2)))
  t.deepEqual(p.slice(undefined, 7), prray(arr.slice(undefined, 7)))
  t.deepEqual(p.slice(1, 5), prray(arr.slice(1, 5)))
  t.deepEqual(p.slice(4, 100), prray(arr.slice(4, 100)))
  t.deepEqual(p.slice(100, 200), prray(arr.slice(100, 200)))

  t.deepEqual(p.slice(-3), prray(arr.slice(-3)))
  t.deepEqual(p.slice(undefined, -4), prray(arr.slice(undefined, -4)))
  t.deepEqual(p.slice(-2, -5), prray(arr.slice(-2, -5)))
  t.deepEqual(p.slice(-5, -2), prray(arr.slice(-5, -2)))
  t.deepEqual(p.slice(-4, -100), prray(arr.slice(-4, -100)))
  t.deepEqual(p.slice(-100, -4), prray(arr.slice(-100, -4)))
  t.deepEqual(p.slice(-200, -100), prray(arr.slice(-200, -100)))

  t.deepEqual(p.slice(-7, 5), prray(arr.slice(-7, 5)))
  t.deepEqual(p.slice(1, -3), prray(arr.slice(1, -3)))
  t.deepEqual(p.slice(-1000, 3), prray(arr.slice(-1000, 3)))
  t.deepEqual(p.slice(-3, 1000), prray(arr.slice(-3, 1000)))

  t.not(p.slice(-3, 1000), p) // Immutable
})

test('prraypromise slice', async t => {
  t.true(pp.slice(1) instanceof PrrayPromise)

  t.deepEqual(await pp.slice(), prray(arr.slice()))

  t.deepEqual(await pp.slice(2), prray(arr.slice(2)))
  t.deepEqual(await pp.slice(undefined, 7), prray(arr.slice(undefined, 7)))
  t.deepEqual(await pp.slice(1, 5), prray(arr.slice(1, 5)))
  t.deepEqual(await pp.slice(4, 100), prray(arr.slice(4, 100)))
  t.deepEqual(await pp.slice(100, 200), prray(arr.slice(100, 200)))

  t.deepEqual(await pp.slice(-3), prray(arr.slice(-3)))
  t.deepEqual(await pp.slice(undefined, -4), prray(arr.slice(undefined, -4)))
  t.deepEqual(await pp.slice(-2, -5), prray(arr.slice(-2, -5)))
  t.deepEqual(await pp.slice(-5, -2), prray(arr.slice(-5, -2)))
  t.deepEqual(await pp.slice(-4, -100), prray(arr.slice(-4, -100)))
  t.deepEqual(await pp.slice(-100, -4), prray(arr.slice(-100, -4)))
  t.deepEqual(await pp.slice(-200, -100), prray(arr.slice(-200, -100)))

  t.deepEqual(await pp.slice(-7, 5), prray(arr.slice(-7, 5)))
  t.deepEqual(await pp.slice(1, -3), prray(arr.slice(1, -3)))
  t.deepEqual(await pp.slice(-1000, 3), prray(arr.slice(-1000, 3)))
  t.deepEqual(await pp.slice(-3, 1000), prray(arr.slice(-3, 1000)))

  t.not(await pp.slice(-3, 1000), await pp) // Immutable
})

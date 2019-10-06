import test from 'ava'
import { prray, Prray } from '../src/prray'
import { toPrrayPromise } from './test-utils'

test('prray fill', async t => {
  t.deepEqual(prray([1, 2, 3]).fill(4), prray([4, 4, 4]))
  t.deepEqual(prray([1, 2, 3]).fill(4, 1), prray([1, 4, 4]))
  t.deepEqual(prray([1, 2, 3]).fill(4, 1, 2), prray([1, 4, 3]))
  t.deepEqual(prray([1, 2, 3]).fill(4, 1, 1), prray([1, 2, 3]))
  t.deepEqual(prray([1, 2, 3]).fill(4, 3, 3), prray([1, 2, 3]))
  t.deepEqual(prray([1, 2, 3]).fill(4, -3, -2), prray([4, 2, 3]))
  t.deepEqual(prray([1, 2, 3]).fill(4, NaN, NaN), prray([1, 2, 3]))
  t.deepEqual(prray([1, 2, 3]).fill(4, 3, 5), prray([1, 2, 3]))

  t.deepEqual(new Prray(3).fill(4), prray([4, 4, 4]))

  const prr = new Prray(3).fill({}) // [{}, {}, {}];
  t.deepEqual(prr, prray([{}, {}, {}]))
  ;(prr[0] as any).hi = 'hi'
  t.deepEqual(prr, prray([{ hi: 'hi' }, { hi: 'hi' }, { hi: 'hi' }]))
})

test('prray fill: mutable', async t => {
  const prr = prray([1, 2, 3])
  t.is(prr.fill(4), prr)
})

test('prraypromise fill', async t => {
  t.deepEqual(await toPrrayPromise([1, 2, 3]).fill(4), prray([4, 4, 4]))
  t.deepEqual(await toPrrayPromise([1, 2, 3]).fill(4, 1), prray([1, 4, 4]))
  t.deepEqual(await toPrrayPromise([1, 2, 3]).fill(4, 1, 2), prray([1, 4, 3]))
  t.deepEqual(await toPrrayPromise([1, 2, 3]).fill(4, 1, 1), prray([1, 2, 3]))
  t.deepEqual(await toPrrayPromise([1, 2, 3]).fill(4, 3, 3), prray([1, 2, 3]))
  t.deepEqual(await toPrrayPromise([1, 2, 3]).fill(4, -3, -2), prray([4, 2, 3]))
  t.deepEqual(await toPrrayPromise([1, 2, 3]).fill(4, NaN, NaN), prray([1, 2, 3]))
  t.deepEqual(await toPrrayPromise([1, 2, 3]).fill(4, 3, 5), prray([1, 2, 3]))

  t.deepEqual(await toPrrayPromise(new Array(3)).fill(4), prray([4, 4, 4]))

  const prr = await toPrrayPromise(new Array(3)).fill({}) // [{}, {}, {}];
  t.deepEqual(prr, prray([{}, {}, {}]))
  ;(prr[0] as any).hi = 'hi'
  t.deepEqual(prr, prray([{ hi: 'hi' }, { hi: 'hi' }, { hi: 'hi' }]))
})

test('prraypromise fill: mutable', async t => {
  const prr = prray([1, 2, 3])
  t.is(await toPrrayPromise(prr).fill(4), prr)
})

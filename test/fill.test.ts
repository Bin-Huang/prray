import test from 'ava'
import Prray from '../src/prray'
import { toPrrayPromise } from './test-utils'

test('prray fill', async t => {
  t.deepEqual(Prray.from([1, 2, 3]).fill(4), Prray.from([4, 4, 4]))
  t.deepEqual(Prray.from([1, 2, 3]).fill(4, 1), Prray.from([1, 4, 4]))
  t.deepEqual(Prray.from([1, 2, 3]).fill(4, 1, 2), Prray.from([1, 4, 3]))
  t.deepEqual(Prray.from([1, 2, 3]).fill(4, 1, 1), Prray.from([1, 2, 3]))
  t.deepEqual(Prray.from([1, 2, 3]).fill(4, 3, 3), Prray.from([1, 2, 3]))
  t.deepEqual(Prray.from([1, 2, 3]).fill(4, -3, -2), Prray.from([4, 2, 3]))
  t.deepEqual(Prray.from([1, 2, 3]).fill(4, NaN, NaN), Prray.from([1, 2, 3]))
  t.deepEqual(Prray.from([1, 2, 3]).fill(4, 3, 5), Prray.from([1, 2, 3]))

  t.deepEqual(new Prray(3).fill(4), Prray.from([4, 4, 4]))

  const prr = new Prray(3).fill({}) // [{}, {}, {}];
  t.deepEqual(prr, Prray.from([{}, {}, {}]))
  ;(prr[0] as any).hi = 'hi'
  t.deepEqual(prr, Prray.from([{ hi: 'hi' }, { hi: 'hi' }, { hi: 'hi' }]))
})

test('prray fill: mutable', async t => {
  const prr = Prray.from([1, 2, 3])
  t.is(prr.fill(4), prr)
})

test('prraypromise fill', async t => {
  t.deepEqual(await toPrrayPromise([1, 2, 3]).fill(4), Prray.from([4, 4, 4]))
  t.deepEqual(await toPrrayPromise([1, 2, 3]).fill(4, 1), Prray.from([1, 4, 4]))
  t.deepEqual(await toPrrayPromise([1, 2, 3]).fill(4, 1, 2), Prray.from([1, 4, 3]))
  t.deepEqual(await toPrrayPromise([1, 2, 3]).fill(4, 1, 1), Prray.from([1, 2, 3]))
  t.deepEqual(await toPrrayPromise([1, 2, 3]).fill(4, 3, 3), Prray.from([1, 2, 3]))
  t.deepEqual(await toPrrayPromise([1, 2, 3]).fill(4, -3, -2), Prray.from([4, 2, 3]))
  t.deepEqual(await toPrrayPromise([1, 2, 3]).fill(4, NaN, NaN), Prray.from([1, 2, 3]))
  t.deepEqual(await toPrrayPromise([1, 2, 3]).fill(4, 3, 5), Prray.from([1, 2, 3]))

  t.deepEqual(await toPrrayPromise(new Array(3)).fill(4), Prray.from([4, 4, 4]))

  const prr = await toPrrayPromise(new Array(3)).fill({}) // [{}, {}, {}];
  t.deepEqual(prr, Prray.from([{}, {}, {}]))
  ;(prr[0] as any).hi = 'hi'
  t.deepEqual(prr, Prray.from([{ hi: 'hi' }, { hi: 'hi' }, { hi: 'hi' }]))
})

test('prraypromise fill: mutable', async t => {
  const prr = Prray.from([1, 2, 3])
  t.is(await toPrrayPromise(prr).fill(4), prr)
})

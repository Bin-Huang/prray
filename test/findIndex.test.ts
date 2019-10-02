import test from 'ava'
import { toPrrayPromise } from './test-utils'
import { prray } from '../src/prray'

test('prray findIndex', async t => {
  const prr = prray([1, 2, 3, 4])
  t.is(prr.findIndex(x => x === 2), 1)
  t.is(prr.findIndex(x => x === 10), -1)
})

test('prray findIndex: order', async t => {
  const prr = prray([{ a: 1 }, { a: 2 }])
  t.deepEqual(prr.findIndex(x => x.a > 0), 0)
  t.is(prr.findIndex(x => x.a > 10), -1)
})

test('prraypromise findIndex', async t => {
  const pp = toPrrayPromise([1, 2, 3, 4])
  t.is(await pp.findIndex(x => x === 2), 1)
  t.is(await pp.findIndex(x => x === 10), -1)
})

test('prraypromise findIndex: order', async t => {
  const pp = toPrrayPromise([{ a: 1 }, { a: 2 }])
  t.deepEqual(await pp.findIndex(x => x.a > 0), 0)
  t.is(await pp.findIndex(x => x.a > 10), -1)
})

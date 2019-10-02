import test from 'ava'
import { toPrrayPromise } from './test-utils'
import { prray } from '../src/prray'

test('prray find', async t => {
  const prr = prray([1, 2, 3, 4])
  t.is(prr.find(x => x === 2), 2)
  t.is(prr.find(x => x === 10), undefined)
})

test('prray find: order', async t => {
  const prr = prray([{ a: 1 }, { a: 2 }])
  t.deepEqual(prr.find(x => x.a > 0), { a: 1 })
  t.is(prr.find(x => x.a > 10), undefined)
})

test('prraypromise find', async t => {
  const pp = toPrrayPromise([1, 2, 3, 4])
  t.is(await pp.find(x => x === 2), 2)
  t.is(await pp.find(x => x === 10), undefined)
})

test('prraypromise find: order', async t => {
  const pp = toPrrayPromise([{ a: 1 }, { a: 2 }])
  t.deepEqual(await pp.find(x => x.a > 0), { a: 1 })
  t.is(await pp.find(x => x.a > 10), undefined)
})

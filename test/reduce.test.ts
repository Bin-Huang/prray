import test from 'ava'
import { prray, Prray } from '../src/prray'
import { toPrrayPromise } from './test-utils'

const func1 = (pre: number, c: number) => pre + c

const func2 = (pre: number[], c: number) => {
  pre.push(c + 1)
  return pre
}

test('prray reduce 1', async t => {
  const p = prray([1, 2, 3])
  t.deepEqual(p.reduce(func1), [1, 2, 3].reduce(func1))
  t.deepEqual(p.reduce(func1, 10), [1, 2, 3].reduce(func1, 10))
})

test('prray reduce 2', async t => {
  const p = prray([1, 2, 3])
  t.deepEqual(p.reduce(func2, []), [1, 2, 3].reduce(func2, []))
  t.deepEqual(p.reduce(func2, []), [1, 2, 3].reduce(func2, []))
})

test('prray reduce 3', async t => {
  const p = prray([1, 2, 3])
  t.deepEqual(p.reduce(func2, new Prray()), [1, 2, 3].reduce(func2, new Prray()))
  t.deepEqual(p.reduce(func2, new Prray()), [1, 2, 3].reduce(func2, new Prray()))
})

test('prraypromise reduce 1', async t => {
  const pp = toPrrayPromise([1, 2, 3])
  t.deepEqual(await pp.reduce(func1), [1, 2, 3].reduce(func1))
  t.deepEqual(await pp.reduce(func1, 10), [1, 2, 3].reduce(func1, 10))
})

test('prraypromise reduce 2', async t => {
  const pp = toPrrayPromise([1, 2, 3])
  t.deepEqual(await pp.reduce(func2, []), [1, 2, 3].reduce(func2, []))
  t.deepEqual(await pp.reduce(func2, []), [1, 2, 3].reduce(func2, []))
})

test('prraypromise reduce 3', async t => {
  const pp = toPrrayPromise([1, 2, 3])
  t.deepEqual(await pp.reduce(func2, new Prray()), [1, 2, 3].reduce(func2, new Prray()))
  t.deepEqual(await pp.reduce(func2, new Prray()), [1, 2, 3].reduce(func2, new Prray()))
})

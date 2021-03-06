import test from 'ava'
import 'source-map-support/register'
import Prray from '../src/prray'
import { toPrrayPromise, delay, getError, noop } from './test-utils'

const asyncFunc1 = (pre: number, c: number) => delay(100).then(() => pre + c)
const func1 = (pre: number, c: number) => pre + c

const asyncFunc2 = async (pre: number[], c: number) => {
  await delay(100)
  pre.push(c + 1)
  return pre
}
const func2 = (pre: number[], c: number) => {
  pre.push(c + 1)
  return pre
}

test('prray reduceAsync 1', async t => {
  const p = Prray.from([1, 2, 3])
  t.true(p.reduceAsync(asyncFunc1) instanceof Promise)
  t.deepEqual(await p.reduceAsync(asyncFunc1), [1, 2, 3].reduce(func1))
  t.deepEqual(await p.reduceAsync(asyncFunc1, 10), [1, 2, 3].reduce(func1, 10))
})

test('prray reduceAsync 2', async t => {
  const p = Prray.from([1, 2, 3])
  t.true(p.reduceAsync(asyncFunc2, []) instanceof Promise)
  t.deepEqual(await p.reduceAsync(asyncFunc2, []), [1, 2, 3].reduce(func2, []))
  t.deepEqual(await p.reduceAsync(asyncFunc2, []), [1, 2, 3].reduce(func2, []))
})

test('prray reduceAsync: reduce of empty array with no initial value', async t => {
  t.deepEqual(await getError(() => Prray.from<any>([]).reduceAsync(noop)), await getError(() => [].reduce(noop as any)))
})

test('prray reduceAsync: returns the initial value if empty', async t => {
  t.deepEqual(await Prray.from([]).reduceAsync(noop, 1), [].reduce(noop, 1))
})

test('prraypromise reduceAsync 1', async t => {
  const pp = toPrrayPromise([1, 2, 3])
  t.true(pp.reduceAsync(asyncFunc1) instanceof Promise)
  t.deepEqual(await pp.reduceAsync(asyncFunc1), [1, 2, 3].reduce(func1))
  t.deepEqual(await pp.reduceAsync(asyncFunc1, 10), [1, 2, 3].reduce(func1, 10))
})

test('prraypromise reduceAsync 2', async t => {
  const pp = toPrrayPromise([1, 2, 3])
  t.true(pp.reduceAsync(asyncFunc2, []) instanceof Promise)
  t.deepEqual(await pp.reduceAsync(asyncFunc2, []), [1, 2, 3].reduce(func2, []))
  t.deepEqual(await pp.reduceAsync(asyncFunc2, []), [1, 2, 3].reduce(func2, []))
})

test('prraypromise reduceAsync: reduce of empty array with no initial value', async t => {
  t.deepEqual(
    await getError(() => toPrrayPromise([]).reduceAsync(noop as any)),
    await getError(() => [].reduce(noop as any)),
  )
})

test('prraypromise reduceAsync: returns the initial value if empty', async t => {
  t.deepEqual(await toPrrayPromise([]).reduceAsync(noop, 1), [].reduce(noop, 1))
})

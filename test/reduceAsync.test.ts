import test from 'ava'
import { prray } from '../src/prray'
import { PrrayPromise } from '../src/prraypromise'
import { toPrrayPromise, delay } from './test-utils'

const func1 = (pre, c) => pre + c
const funcAsync1 = (pre, c) => delay(100).then(() => pre + c)

const func2 = (pre, c) => {
  pre.push(c + 1)
  return pre
}
const funcAsync2 = async (pre, c) => {
  await delay(100)
  pre.push(c + 1)
  return pre
}

test('prray reduceAsync 1', async (t) => {
  const p = prray([1,2,3])

  // FIXME: 无法确定 reduceAsync 的结果是不是数组，应该让 PrrayPromise 处理和兼容非数组的情况？
  // t.true(p.reduceAsync(func1) instanceof PrrayPromise)
  // t.true(p.reduceAsync(funcAsync1) instanceof PrrayPromise)

  t.deepEqual(await p.reduceAsync(func1), [1,2,3].reduce(func1))
  t.deepEqual(await p.reduceAsync(funcAsync1), [1,2,3].reduce(func1))

  t.deepEqual(await p.reduceAsync(func1, 10), [1,2,3].reduce(func1, 10))
  t.deepEqual(await p.reduceAsync(funcAsync1, 10), [1,2,3].reduce(func1, 10))
})

test('prray reduceAsync 2', async (t) => {
  const p = prray([1,2,3])

  // t.true(p.reduceAsync(func2, []) instanceof PrrayPromise)
  // t.true(p.reduceAsync(funcAsync2, []) instanceof PrrayPromise)

  t.deepEqual(await p.reduceAsync(func2, []), [1,2,3].reduce(func2, []))
  t.deepEqual(await p.reduceAsync(func2, []), [1,2,3].reduce(func2, []))
})

test('prraypromise reduceAsync 1', async (t) => {
  const pp = toPrrayPromise([1,2,3])

  // FIXME: 无法确定 reduceAsync 的结果是不是数组，应该让 PrrayPromise 处理和兼容非数组的情况？
  // t.true(pp.reduceAsync(func1) instanceof PrrayPromise)
  // t.true(pp.reduceAsync(funcAsync1) instanceof PrrayPromise)

  t.deepEqual(await pp.reduceAsync(func1), [1,2,3].reduce(func1))
  t.deepEqual(await pp.reduceAsync(funcAsync1), [1,2,3].reduce(func1))

  t.deepEqual(await pp.reduceAsync(func1, 10), [1,2,3].reduce(func1, 10))
  t.deepEqual(await pp.reduceAsync(funcAsync1, 10), [1,2,3].reduce(func1, 10))
})

test('prraypromise reduceAsync 2', async (t) => {
  const pp = toPrrayPromise([1,2,3])

  // t.true(pp.reduceAsync(func2, []) instanceof PrrayPromise)
  // t.true(pp.reduceAsync(funcAsync2, []) instanceof PrrayPromise)

  t.deepEqual(await pp.reduceAsync(func2, []), [1,2,3].reduce(func2, []))
  t.deepEqual(await pp.reduceAsync(func2, []), [1,2,3].reduce(func2, []))
})

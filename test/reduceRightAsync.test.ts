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

test('prray reduceRightAsync 1', async (t) => {
  const p = prray([1,2,3])

  // FIXME: 无法确定 reduceRightAsync 的结果是不是数组，应该让 PrrayPromise 处理和兼容非数组的情况？
  // t.true(p.reduceRightAsync(func1) instanceof PrrayPromise)
  // t.true(p.reduceRightAsync(funcAsync1) instanceof PrrayPromise)

  t.deepEqual(await p.reduceRightAsync(func1), [1,2,3].reduceRight(func1))
  t.deepEqual(await p.reduceRightAsync(funcAsync1), [1,2,3].reduceRight(func1))

  t.deepEqual(await p.reduceRightAsync(func1, 10), [1,2,3].reduceRight(func1, 10))
  t.deepEqual(await p.reduceRightAsync(funcAsync1, 10), [1,2,3].reduceRight(func1, 10))
})

test('prray reduceRightAsync 2', async (t) => {
  const p = prray([1,2,3])

  // t.true(p.reduceRightAsync(func2, []) instanceof PrrayPromise)
  // t.true(p.reduceRightAsync(funcAsync2, []) instanceof PrrayPromise)

  t.deepEqual(await p.reduceRightAsync(func2, []), [1,2,3].reduceRight(func2, []))
  t.deepEqual(await p.reduceRightAsync(func2, []), [1,2,3].reduceRight(func2, []))
})

test('prraypromise reduceRightAsync 1', async (t) => {
  const pp = toPrrayPromise([1,2,3])

  // FIXME: 无法确定 reduceRightAsync 的结果是不是数组，应该让 PrrayPromise 处理和兼容非数组的情况？
  // TODO:
  // t.true(pp.reduceRightAsync(func1) instanceof PrrayPromise)
  // t.true(pp.reduceRightAsync(funcAsync1) instanceof PrrayPromise)

  t.deepEqual(await pp.reduceRightAsync(func1), [1,2,3].reduceRight(func1))
  t.deepEqual(await pp.reduceRightAsync(funcAsync1), [1,2,3].reduceRight(func1))

  t.deepEqual(await pp.reduceRightAsync(func1, 10), [1,2,3].reduceRight(func1, 10))
  t.deepEqual(await pp.reduceRightAsync(funcAsync1, 10), [1,2,3].reduceRight(func1, 10))
})

test('prraypromise reduceRightAsync 2', async (t) => {
  const pp = toPrrayPromise([1,2,3])

  // TODO:
  // t.true(pp.reduceRightAsync(func2, []) instanceof PrrayPromise)
  // t.true(pp.reduceRightAsync(funcAsync2, []) instanceof PrrayPromise)

  t.deepEqual(await pp.reduceRightAsync(func2, []), [1,2,3].reduceRight(func2, []))
  t.deepEqual(await pp.reduceRightAsync(func2, []), [1,2,3].reduceRight(func2, []))
})

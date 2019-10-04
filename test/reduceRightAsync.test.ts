import test from 'ava'
import { prray } from '../src/prray'
import { toPrrayPromise, delay } from './test-utils'

const func1 = (pre: number, c: number) => pre + c
const funcAsync1 = (pre: number, c: number) => delay(100).then(() => pre + c)

const func2 = (pre: number[], c: number) => {
  pre.push(c + 1)
  return pre
}
const funcAsync2 = async (pre: number[], c: number) => {
  await delay(100)
  pre.push(c + 1)
  return pre
}

test('prray reduceRightAsync 1', async t => {
  const p = prray([1, 2, 3])

  t.deepEqual(await p.reduceRightAsync(func1), [1, 2, 3].reduceRight(func1))
  t.deepEqual(await p.reduceRightAsync(funcAsync1), [1, 2, 3].reduceRight(func1))

  t.deepEqual(await p.reduceRightAsync(func1, 10), [1, 2, 3].reduceRight(func1, 10))
  t.deepEqual(await p.reduceRightAsync(funcAsync1, 10), [1, 2, 3].reduceRight(func1, 10))
})

test('prray reduceRightAsync 2', async t => {
  const p = prray([1, 2, 3])

  t.deepEqual(await p.reduceRightAsync(func2, [] as number[]), [1, 2, 3].reduceRight(func2, []))
  t.deepEqual(await p.reduceRightAsync(func2, [] as number[]), [1, 2, 3].reduceRight(func2, []))
})

test('prraypromise reduceRightAsync 1', async t => {
  const pp = toPrrayPromise([1, 2, 3])

  t.deepEqual(await pp.reduceRightAsync(func1), [1, 2, 3].reduceRight(func1))
  t.deepEqual(await pp.reduceRightAsync(funcAsync1), [1, 2, 3].reduceRight(func1))

  t.deepEqual(await pp.reduceRightAsync(func1, 10), [1, 2, 3].reduceRight(func1, 10))
  t.deepEqual(await pp.reduceRightAsync(funcAsync1, 10), [1, 2, 3].reduceRight(func1, 10))
})

test('prraypromise reduceRightAsync 2', async t => {
  const pp = toPrrayPromise([1, 2, 3])

  t.deepEqual(await pp.reduceRightAsync(func2, [] as number[]), [1, 2, 3].reduceRight(func2, []))
  t.deepEqual(await pp.reduceRightAsync(func2, [] as number[]), [1, 2, 3].reduceRight(func2, []))
})

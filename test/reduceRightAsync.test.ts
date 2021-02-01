import test from 'ava'
import Prray from '../src/prray'
import { toPrrayPromise, delay, getError, noop } from './test-utils'

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
  const p = Prray.from([1, 2, 3])

  t.deepEqual(await p.reduceRightAsync(func1), [1, 2, 3].reduceRight(func1))
  t.deepEqual(await p.reduceRightAsync(funcAsync1), [1, 2, 3].reduceRight(func1))

  t.deepEqual(await p.reduceRightAsync(func1, 10), [1, 2, 3].reduceRight(func1, 10))
  t.deepEqual(await p.reduceRightAsync(funcAsync1, 10), [1, 2, 3].reduceRight(func1, 10))
})

test('prray reduceRightAsync 2', async t => {
  const p = Prray.from([1, 2, 3])

  t.deepEqual(await p.reduceRightAsync(func2, [] as number[]), [1, 2, 3].reduceRight(func2, []))
  t.deepEqual(await p.reduceRightAsync(func2, [] as number[]), [1, 2, 3].reduceRight(func2, []))
})

test('prray reduceRightAsync: reduce of empty array with no initial value', async t => {
  t.deepEqual(
    await getError(() => Prray.from<any>([]).reduceRightAsync(noop)),
    await getError(() => [].reduceRight(noop as any)),
  )
})

test('prray reduceRightAsync: returns the initial value if empty', async t => {
  t.deepEqual(await Prray.from([]).reduceRightAsync(noop, 1), [].reduceRight(noop, 1))
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

test('prraypromise reduceRightAsync: reduce of empty array with no initial value', async t => {
  t.deepEqual(
    await getError(() => toPrrayPromise([]).reduceRightAsync(noop as any)),
    await getError(() => [].reduceRight(noop as any)),
  )
})

test('prraypromise reduceRightAsync: returns the initial value if empty', async t => {
  t.deepEqual(await toPrrayPromise([]).reduceRightAsync(noop, 1), [].reduceRight(noop, 1))
})

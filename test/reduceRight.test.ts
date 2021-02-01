import test from 'ava'
import Prray from '../src/prray'
import { toPrrayPromise, getError, noop } from './test-utils'

const func1 = (pre: number, c: number) => pre + c

const func2 = (pre: number[], c: number) => {
  pre.push(c + 1)
  return pre
}

test('prray reduceRight 1', async t => {
  const p = Prray.from([1, 2, 3])
  t.deepEqual(p.reduceRight(func1), [1, 2, 3].reduceRight(func1))
  t.deepEqual(p.reduceRight(func1, 10), [1, 2, 3].reduceRight(func1, 10))
})

test('prray reduceRight 2', async t => {
  const p = Prray.from([1, 2, 3])
  t.deepEqual(p.reduceRight(func2, []), [1, 2, 3].reduceRight(func2, []))
  t.deepEqual(p.reduceRight(func2, []), [1, 2, 3].reduceRight(func2, []))
})

test('prray reduceRight 3', async t => {
  const p = Prray.from([1, 2, 3])
  t.deepEqual(p.reduceRight(func2, new Prray()), [1, 2, 3].reduceRight(func2, new Prray()))
  t.deepEqual(p.reduceRight(func2, new Prray()), [1, 2, 3].reduceRight(func2, new Prray()))
})

test('prray reduceRight: reduce of empty array with no initial value', async t => {
  t.deepEqual(
    await getError(() => Prray.from<any>([]).reduceRight(noop)),
    await getError(() => [].reduceRight(noop as any)),
  )
})

test('prray reduceRight: returns the initial value if empty', async t => {
  t.deepEqual(Prray.from([]).reduceRight(noop, 1), [].reduceRight(noop, 1))
})

test('prraypromise reduceRight 1', async t => {
  const pp = toPrrayPromise([1, 2, 3])
  t.deepEqual(await pp.reduceRight(func1), [1, 2, 3].reduceRight(func1))
  t.deepEqual(await pp.reduceRight(func1, 10), [1, 2, 3].reduceRight(func1, 10))
})

test('prraypromise reduceRight 2', async t => {
  const pp = toPrrayPromise([1, 2, 3])
  t.deepEqual(await pp.reduceRight(func2, []), [1, 2, 3].reduceRight(func2, []))
  t.deepEqual(await pp.reduceRight(func2, []), [1, 2, 3].reduceRight(func2, []))
})

test('prraypromise reduceRight 3', async t => {
  const pp = toPrrayPromise([1, 2, 3])
  t.deepEqual(await pp.reduceRight(func2, new Prray()), [1, 2, 3].reduceRight(func2, new Prray()))
  t.deepEqual(await pp.reduceRight(func2, new Prray()), [1, 2, 3].reduceRight(func2, new Prray()))
})

test('prraypromise reduceRight: reduce of empty array with no initial value', async t => {
  t.deepEqual(
    await getError(() => toPrrayPromise([]).reduceRight(noop as any)),
    await getError(() => [].reduceRight(noop as any)),
  )
})

test('prraypromise reduceRight: returns the initial value if empty', async t => {
  t.deepEqual(await toPrrayPromise([]).reduceRight(noop, 1), [].reduceRight(noop, 1))
})

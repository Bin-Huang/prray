import test from 'ava'
import { prray } from '../src/prray'
import { PrrayPromise } from '../src/prraypromise'
import { toPrrayPromise, delay, genRandArr } from './test-utils'

const funcAsync = (a: number, b: number) => delay(100).then(() => a - b)
const func = (a: number, b: number) => a - b

const getTests = () => {
  return [
    [],
    [2],
    [4, 2],
    // ['3','b',1,2,'a',4,'2000'],
    genRandArr(),
    genRandArr(),
    genRandArr(),
    genRandArr(),
    genRandArr(),
  ]
}

test('prray sortAsync', async t => {
  for (const arr of getTests()) {
    const p = prray(arr)
    const expect = prray(arr.sort(func))

    t.true(p.sortAsync(funcAsync) instanceof PrrayPromise)
    t.true(p.sortAsync(func) instanceof PrrayPromise)
    t.true(p.sortAsync() instanceof PrrayPromise)

    t.deepEqual(await p.sortAsync(funcAsync), expect)
    t.deepEqual(await p.sortAsync(func), expect)
    t.deepEqual(await p.sortAsync(), expect)

    // FIXME:
    // t.is(await p.sortAsync(), p)  // mutable
  }
})

test('prraypromise sortAsync', async t => {
  for (const arr of getTests()) {
    const p = prray(arr)
    const pp = toPrrayPromise(arr)
    const expect = prray(arr.sort(func))

    t.true(pp.sortAsync(funcAsync) instanceof PrrayPromise)
    t.true(pp.sortAsync(func) instanceof PrrayPromise)
    t.true(pp.sortAsync() instanceof PrrayPromise)

    t.deepEqual(await pp.sortAsync(funcAsync), expect)
    t.deepEqual(await pp.sortAsync(func), expect)
    t.deepEqual(await pp.sortAsync(), expect)

    // FIXME:
    // t.deepEqual(await pp.sortAsync(), p)  //  mutable
  }
})

import test from 'ava'
import { prray } from '../src/prray'
import { toPrrayPromise, genRandArr } from './test-utils'

const func = (a, b) => a - b

const getTests = () => {
  return [
    [],
    [2],
    [4,2],
    // ['3','b',1,2,'a',4,'2000'],
    genRandArr(),
    genRandArr(),
    genRandArr(),
    genRandArr(),
    genRandArr(),
  ]
}

test('prray sort', async (t) => {
  for (const arr of getTests()) {
    const p = prray(arr)
    const expect = prray(arr.sort(func))

    t.deepEqual(p.sort(func), expect)
    t.deepEqual(p.sort(), expect)

    t.deepEqual(p, expect)  // mutable
  }
})

test('prraypromise sort', async (t) => {
  for (const arr of getTests()) {
    const pp = toPrrayPromise(arr)
    const expect = prray(arr.sort(func))

    t.deepEqual(await pp.sort(func), expect)
    t.deepEqual(await pp.sort(), expect)

    t.deepEqual(await pp, expect)  // mutable
  }
})

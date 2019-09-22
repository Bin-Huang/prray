import test from 'ava'
const { prraypromise, PrrayPromise } = require('../src/prraypromise')
const Prray = require('../src/prray')
const { delay, genRandArr } = require('./test-utils')

const funcAsync = (a, b) => delay(100).then(() => a - b)
const func = (a, b) => a - b

const tests = [
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

test('prray sort', async (t) => {
  for (const arr of tests) {
    const p = new Prray(arr)
    const expect = new Prray(arr.sort(func))

    t.true(p.sort(funcAsync) instanceof PrrayPromise)
    t.true(p.sort(func) instanceof PrrayPromise)
    t.true(p.sort() instanceof PrrayPromise)

    t.deepEqual(await p.sort(funcAsync), expect)
    t.deepEqual(await p.sort(func), expect)
    t.deepEqual(await p.sort(), expect)
  }
})

test('prraypromise sort', async (t) => {
  for (const arr of tests) {
    const pp = prraypromise(Promise.resolve(arr))
    const expect = new Prray(arr.sort(func))

    t.true(pp.sort(funcAsync) instanceof PrrayPromise)
    t.true(pp.sort(func) instanceof PrrayPromise)
    t.true(pp.sort() instanceof PrrayPromise)

    t.deepEqual(await pp.sort(funcAsync), expect)
    t.deepEqual(await pp.sort(func), expect)
    t.deepEqual(await pp.sort(), expect)
  }
})

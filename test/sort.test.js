import test from 'ava'
const { prraypromise, PrrayPromise } = require('../src/prraypromise')
const { prray } = require('../src/prray')
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

test('prray sortAsync', async (t) => {
  for (const arr of tests) {
    const p = prray(arr)
    const expect = prray(arr.sort(func))

    t.true(p.sortAsync(funcAsync) instanceof PrrayPromise)
    t.true(p.sortAsync(func) instanceof PrrayPromise)
    t.true(p.sortAsync() instanceof PrrayPromise)

    t.deepEqual(await p.sortAsync(funcAsync), expect)
    t.deepEqual(await p.sortAsync(func), expect)
    t.deepEqual(await p.sortAsync(), expect)
  }
})

test('prraypromise sortAsync', async (t) => {
  for (const arr of tests) {
    const pp = prraypromise(Promise.resolve(arr))
    const expect = prray(arr.sort(func))

    t.true(pp.sortAsync(funcAsync) instanceof PrrayPromise)
    t.true(pp.sortAsync(func) instanceof PrrayPromise)
    t.true(pp.sortAsync() instanceof PrrayPromise)

    t.deepEqual(await pp.sortAsync(funcAsync), expect)
    t.deepEqual(await pp.sortAsync(func), expect)
    t.deepEqual(await pp.sortAsync(), expect)
  }
})

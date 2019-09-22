import test from 'ava'
const Prray = require('../src/prray')
const { isEven, isEvenAsync } = require('./test-utils')
const { PrrayPromise, prraypromise } = require('../src/prraypromise')

test('prray filter', async (t) => {
  const p = new Prray([1,2,3,4])

  t.true(p.filter(isEvenAsync) instanceof PrrayPromise)
  t.true(p.filter(isEven) instanceof PrrayPromise)

  t.deepEqual(await p.filter(isEvenAsync), new Prray([2,4]))
  t.deepEqual(await p.filter(isEven), new Prray([2,4]))
})

test('prraypromise filter', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3,4]))

  t.true(pp.filter(isEvenAsync) instanceof PrrayPromise)
  t.true(pp.filter(isEven) instanceof PrrayPromise)

  t.deepEqual(await pp.filter(isEvenAsync), new Prray([2,4]))
  t.deepEqual(await pp.filter(isEven), new Prray([2,4]))
})

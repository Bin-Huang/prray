import test from 'ava'
const { prraypromise, PrrayPromise } = require('../src/prraypromise')
const Prray = require('../src/prray')
const { addOneAsync, addOne } = require('./test-utils')

test('prray map', async (t) => {
  const p = new Prray([1,2,3])

  t.true(p.map(addOneAsync) instanceof PrrayPromise)
  t.true(p.map(addOne) instanceof PrrayPromise)

  t.deepEqual(await p.map(addOneAsync), new Prray([2,3,4]))
  t.deepEqual(await p.map(addOne), new Prray([2,3,4]))
})

test('prraypromise map', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3]))

  t.true(pp.map(addOneAsync) instanceof PrrayPromise)
  t.true(pp.map(addOne) instanceof PrrayPromise)

  t.deepEqual(await pp.map(addOneAsync), new Prray([2,3,4]))
  t.deepEqual(await pp.map(addOne), new Prray([2,3,4]))
})

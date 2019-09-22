import test from 'ava'
const { prraypromise, PrrayPromise } = require('../src/prraypromise')
const { prray } = require('../src/prray')
const { addOneAsync, addOne } = require('./test-utils')

test('prray map', async (t) => {
  const p = prray([1,2,3])

  t.true(p.map(addOneAsync) instanceof PrrayPromise)
  t.true(p.map(addOne) instanceof PrrayPromise)

  t.deepEqual(await p.map(addOneAsync), prray([2,3,4]))
  t.deepEqual(await p.map(addOne), prray([2,3,4]))
})

test('prraypromise map', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3]))

  t.true(pp.map(addOneAsync) instanceof PrrayPromise)
  t.true(pp.map(addOne) instanceof PrrayPromise)

  t.deepEqual(await pp.map(addOneAsync), prray([2,3,4]))
  t.deepEqual(await pp.map(addOne), prray([2,3,4]))
})

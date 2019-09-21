import test from 'ava'
const { prraypromise } = require('../src/prraypromise')
const Prray = require('../src/prray')
const { isGte3 } = require('./test-utils')

test('prray every', async (t) => {
  t.is(await new Prray(3,4).every(isGte3), true)
  t.is(await new Prray(1,2,3).every(isGte3), false)

  t.true(new Prray(2,3,4).every(isGte3) instanceof Promise)
})

test('prraypromise every', async (t) => {
  t.is(await prraypromise(Promise.resolve([3,4])).every(isGte3), true)
  t.is(await prraypromise(Promise.resolve([1,2,3])).every(isGte3), false)

  t.true(prraypromise(Promise.resolve([2,3])).every(isGte3) instanceof Promise)
})

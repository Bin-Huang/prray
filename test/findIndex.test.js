import test from 'ava'
const { prraypromise } = require('../src/prraypromise')
const Prray = require('../src/prray')
const { isOne } = require('./test-utils')

test('prray findIndex', async (t) => {
  t.is(await new Prray(1,2,3,4).findIndex(isOne), 0)
  t.is(await new Prray(2,3,4).findIndex(isOne), -1)

  t.true(new Prray(2,3,4).findIndex(isOne) instanceof Promise)
})

test('prraypromise findIndex', async (t) => {
  t.is(await prraypromise(Promise.resolve([1,2,3])).findIndex(isOne), 0)
  t.is(await prraypromise(Promise.resolve([2,3])).findIndex(isOne), -1)

  t.true(prraypromise(Promise.resolve([2,3])).findIndex(isOne) instanceof Promise)
})

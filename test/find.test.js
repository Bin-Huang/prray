import test from 'ava'
const { prraypromise } = require('../src/prraypromise')
const Prray = require('../src/prray')
const { isOne } = require('./test-utils')

test('prray find', async (t) => {
  t.is(await new Prray(1,2,3,4).find(isOne), 1)
  t.is(await new Prray(2,3,4).find(isOne), undefined)

  t.true(new Prray(2,3,4).find(isOne) instanceof Promise)
})

test('prraypromise find', async (t) => {
  t.is(await prraypromise(Promise.resolve([1,2,3])).find(isOne), 1)
  t.is(await prraypromise(Promise.resolve([2,3])).find(isOne), undefined)

  t.true(prraypromise(Promise.resolve([2,3])).find(isOne) instanceof Promise)
})

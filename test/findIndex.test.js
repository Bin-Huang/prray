import test from 'ava'
const { prraypromise } = require('../src/prraypromise')
const { prray } = require('../src/prray')
const { isGte3, isGte3Async } = require('./test-utils')

const p1 = prray([1,2,3])
const p2 = prray([0,2])

const pp1 = prraypromise(Promise.resolve([1,2,3]))
const pp2 = prraypromise(Promise.resolve([0,2]))

test('prray findIndex', async (t) => {
  t.true(p1.findIndex(isGte3Async) instanceof Promise)
  t.true(p1.findIndex(isGte3) instanceof Promise)

  t.is(await p1.findIndex(isGte3Async), 2)
  t.is(await p2.findIndex(isGte3Async), -1)

  t.is(await p1.findIndex(isGte3), 2)
  t.is(await p2.findIndex(isGte3), -1)
})

test('prraypromise findIndex', async (t) => {
  t.true(pp1.findIndex(isGte3Async) instanceof Promise)
  t.true(pp1.findIndex(isGte3) instanceof Promise)

  t.is(await pp1.findIndex(isGte3Async), 2)
  t.is(await pp2.findIndex(isGte3Async), -1)

  t.is(await pp1.findIndex(isGte3), 2)
  t.is(await pp2.findIndex(isGte3), -1)
})

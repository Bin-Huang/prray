import test from 'ava'
const { prraypromise } = require('../src/prraypromise')
const { prray } = require('../src/prray')
const { isGte3, isGte3Async } = require('./test-utils')

const p1 = prray([1,2,3])
const p2 = prray([0,2])

const pp1 = prraypromise(Promise.resolve([1,2,3]))
const pp2 = prraypromise(Promise.resolve([0,2]))

test('prray findIndexAsync', async (t) => {
  t.true(p1.findIndexAsync(isGte3Async) instanceof Promise)
  t.true(p1.findIndexAsync(isGte3) instanceof Promise)

  t.is(await p1.findIndexAsync(isGte3Async), 2)
  t.is(await p2.findIndexAsync(isGte3Async), -1)

  t.is(await p1.findIndexAsync(isGte3), 2)
  t.is(await p2.findIndexAsync(isGte3), -1)
})

test('prraypromise findIndexAsync', async (t) => {
  t.true(pp1.findIndexAsync(isGte3Async) instanceof Promise)
  t.true(pp1.findIndexAsync(isGte3) instanceof Promise)

  t.is(await pp1.findIndexAsync(isGte3Async), 2)
  t.is(await pp2.findIndexAsync(isGte3Async), -1)

  t.is(await pp1.findIndexAsync(isGte3), 2)
  t.is(await pp2.findIndexAsync(isGte3), -1)
})

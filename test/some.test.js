import test from 'ava'
const { prraypromise } = require('../src/prraypromise')
const { prray } = require('../src/prray')
const { isGte3Async, isGte3 } = require('./test-utils')

const p1 = prray([1,3])
const p2 = prray([1,2])

const pp1 = prraypromise(Promise.resolve([1,3]))
const pp2 = prraypromise(Promise.resolve([1,2]))

test('prray someAsync', async (t) => {
  t.true(p1.someAsync(isGte3Async) instanceof Promise)
  t.true(p1.someAsync(isGte3) instanceof Promise)

  t.is(await p1.someAsync(isGte3Async), true)
  t.is(await p2.someAsync(isGte3Async), false)

  t.is(await p1.someAsync(isGte3), true)
  t.is(await p2.someAsync(isGte3), false)
})

test('prraypromise someAsync', async (t) => {
  t.true(pp1.someAsync(isGte3Async) instanceof Promise)
  t.true(pp1.someAsync(isGte3) instanceof Promise)

  t.is(await pp1.someAsync(isGte3Async), true)
  t.is(await pp2.someAsync(isGte3Async), false)

  t.is(await pp1.someAsync(isGte3), true)
  t.is(await pp2.someAsync(isGte3), false)
})

import test from 'ava'
const { prraypromise } = require('../src/prraypromise')
const Prray = require('../src/prray')
const { isGte3Async, isGte3 } = require('./test-utils')

const p1 = new Prray([1,3])
const p2 = new Prray([1,2])

const pp1 = prraypromise(Promise.resolve([1,3]))
const pp2 = prraypromise(Promise.resolve([1,2]))

test('prray some', async (t) => {
  t.true(p1.some(isGte3Async) instanceof Promise)
  t.true(p1.some(isGte3) instanceof Promise)

  t.is(await p1.some(isGte3Async), true)
  t.is(await p2.some(isGte3Async), false)

  t.is(await p1.some(isGte3), true)
  t.is(await p2.some(isGte3), false)
})

test('prraypromise some', async (t) => {
  t.true(pp1.some(isGte3Async) instanceof Promise)
  t.true(pp1.some(isGte3) instanceof Promise)

  t.is(await pp1.some(isGte3Async), true)
  t.is(await pp2.some(isGte3Async), false)

  t.is(await pp1.some(isGte3), true)
  t.is(await pp2.some(isGte3), false)
})

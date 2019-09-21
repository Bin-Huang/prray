import test from 'ava'
const sinon = require('sinon')
const { prraypromise } = require('../src/prraypromise')
const Prray = require('../src/prray')
const { delay } = require('./test-utils')

test('prray forEach', async (t) => {
  const result = []
  await new Prray(1,2,3).forEach(async (v) => {
    await delay(100)
    result.push(v + 1)
  })
  t.deepEqual(result, [2,3,4])
})

test('prraypromise forEach', async (t) => {
  const result = []
  await prraypromise(Promise.resolve([1,2,3])).forEach(async (v) => {
    await delay(100)
    result.push(v + 1)
  })
  t.deepEqual(result, [2,3,4])
})

test('prray forEach compatibility', async (t) => {
  const func = sinon.fake()
  const prray = new Prray('a', 'b', 'c')
  await prray.forEach(func)

  t.is(func.called, true)
  t.is(func.callCount, 3)

  t.is(func.args[0][0], 'a')
  t.is(func.args[0][1], 0)
  t.is(func.args[0][2], prray)

  t.is(func.args[1][0], 'b')
  t.is(func.args[1][1], 1)
  t.is(func.args[1][2], prray)

  t.is(func.args[2][0], 'c')
  t.is(func.args[2][1], 2)
  t.is(func.args[2][2], prray)
})

test('prraypromise forEach compatibility', async (t) => {
  const func = sinon.fake()
  const p = prraypromise(Promise.resolve(['a', 'b', 'c']))
  await p.forEach(func)

  t.is(func.called, true)
  t.is(func.callCount, 3)

  t.is(func.args[0][0], 'a')
  t.is(func.args[0][1], 0)
  t.deepEqual(func.args[0][2], new Prray('a', 'b', 'c'))

  t.is(func.args[1][0], 'b')
  t.is(func.args[1][1], 1)
  t.deepEqual(func.args[1][2], new Prray('a', 'b', 'c'))

  t.is(func.args[2][0], 'c')
  t.is(func.args[2][1], 2)
  t.deepEqual(func.args[2][2], new Prray('a', 'b', 'c'))
})

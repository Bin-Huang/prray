import test from 'ava'
const { prraypromise } = require('../src/prraypromise')
const Prray = require('../src/prray')
const { delay } = require('./test-utils')

test('array compatibility', async (t) => {
  const p = new Prray(1,2,3,4)
  t.is(Array.isArray(p), true)
  t.is(p instanceof Prray, true)
  t.is(p instanceof Array, true)
  t.is(p.length, 4)
  t.deepEqual(await p.map((i) => i + 1), new Prray(2,3,4,5))
  t.deepEqual([...p], [1,2,3,4])
  t.deepEqual(JSON.stringify(p), JSON.stringify([1,2,3,4]))

  let ix = 1 
  for (const item of p) {
    t.is(item, ix ++)
  }

  ix = 1 
  for (const item in p) {
    t.is(p[item], ix ++)
  }
})

const addOneAsync = (i) => delay(100).then(() => i + 1)
const addOne = (i) => delay(100).then(() => i + 1)

test('prraypromise map', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3,4]))
  t.deepEqual(await pp, new Prray(1,2,3,4))
  t.deepEqual(await pp.map(addOneAsync), new Prray(2,3,4,5))
  t.deepEqual(await pp.map(addOneAsync).map(addOneAsync), new Prray(3,4,5,6))
})

test('prray map', async (t) => {
  const p = new Prray(1,2,3)
  t.deepEqual(await p.map(addOneAsync), new Prray(2,3,4))

  t.deepEqual(await p.map(addOneAsync).map(addOneAsync), new Prray(3,4,5))
  t.deepEqual(await p.map(addOneAsync).map(addOne), new Prray(3,4,5))
  t.deepEqual(await p.map(addOneAsync).map(addOneAsync), new Prray(3,4,5))
  t.deepEqual(await p.map(addOne).map(addOne), new Prray(3,4,5))

  let pp = await p.map(addOneAsync)
  pp = await pp.map(addOneAsync).map(addOneAsync)
  t.deepEqual(pp, new Prray(4,5,6))

  t.notDeepEqual(await p.map(addOneAsync), [2,3,4])
})

const isEven = (i) => i % 2 === 0
const isEvenAsync = (i) => delay(100).then(() => i % 2 === 0)
const isGte3 = (i) => i >= 3
const isGte3Async = (i) => delay(100).then(() => i >= 3)

test('prray filter', async (t) => {
  const p = new Prray(1,2,3,4)
  t.deepEqual(await p.filter(isEvenAsync), new Prray(2,4))

  t.deepEqual(await p.filter(isEvenAsync).filter(isGte3Async), new Prray(4))
  t.deepEqual(await p.filter(isEvenAsync).filter(isGte3), new Prray(4))
  t.deepEqual(await p.filter(isEven).filter(isGte3Async), new Prray(4))
  t.deepEqual(await p.filter(isEven).filter(isGte3), new Prray(4))

  let pp = await p.filter(isEvenAsync)
  pp = await pp.filter(isGte3Async)
  t.deepEqual(pp, new Prray(4))

  t.notDeepEqual(await p.filter(isEvenAsync), [2,4])
})

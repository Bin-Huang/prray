import test from 'ava'
const { prraypromise } = require('../src/prraypromise')
const Prray = require('../src/prray')
const { delay } = require('../src/utils')


test('array compatibility', (t) => {
  const p = new Prray(1,2,3,4)
  t.is(Array.isArray(p), true)
  t.is(p instanceof Prray, true)
  t.is(p instanceof Array, true)
  t.is(p.length, 4)
  t.deepEqual(p.map((i) => i + 1), new Prray(2,3,4,5))
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

const addAsync = (i) => delay(100).then(() => i + 1)

test('prraypromise map', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3,4]))
  t.deepEqual(await pp, [1,2,3,4])
  t.deepEqual(await pp.map(addAsync), [2,3,4,5])
  t.deepEqual(await pp.map(addAsync).map(addAsync, 2), [3,4,5,6])
})

test('prray map', async (t) => {
  const p = new Prray(1,2,3,4)
  t.deepEqual(await p.map(addAsync), [2,3,4,5])
  t.deepEqual(await p.map(addAsync).map(addAsync), [3,4,5,6])
  t.deepEqual(await p.map(addAsync)
    .map(addAsync)
    .map(addAsync)
    .map(addAsync)
    .map(addAsync),
    [6,7,8,9])
})

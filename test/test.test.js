import test from 'ava'
const { prray, Prray } = require('../src/prray')

test('array compatibility', async (t) => {
  const p = prray([1,2,3,4])
  t.is(Array.isArray(p), true)
  t.is(p instanceof Prray, true)
  t.is(p instanceof Array, true)
  t.is(p.length, 4)
  t.is(p[0], 1)
  t.deepEqual(await p.map((i) => i + 1), prray([2,3,4,5]))
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

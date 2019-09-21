import test from 'ava'
const { prraypromise } = require('../src/prraypromise')
const Prray = require('../src/prray')
const { delay, genRandArr } = require('./test-utils')

test('prray sort', async (t) => {
  const t1 = []
  t.deepEqual(await new Prray(...t1).sort(), new Prray(...t1.sort()))

  const t2 = [2]
  t.deepEqual(await new Prray(...t2).sort(), new Prray(...t2.sort()))

  const t3 = ['3','b',1,2,'a',4,'2000']
  t.deepEqual(await new Prray(...t3).sort(), new Prray(...t3.sort()))

  for (let i = 0; i < 10; i ++) {
    const t4 = genRandArr()
    t.deepEqual(
      await new Prray(...t4).sort((a, b) => delay(100).then(() => a - b)),
      new Prray(...t4.sort((a, b) => a - b)),
    )
  }

})

test('prraypromise every', async (t) => {
  const t1 = []
  t.deepEqual(await prraypromise(Promise.resolve(t1)).sort(), new Prray(...t1.sort()))

  const t2 = [2]
  t.deepEqual(await prraypromise(Promise.resolve(t2)).sort(), new Prray(...t2.sort()))

  const t3 = ['3','b',1,2,'a',4,'2000']
  t.deepEqual(await prraypromise(Promise.resolve(t3)).sort(), new Prray(...t3.sort()))

  for (let i = 0; i < 10; i ++) {
    const t4 = genRandArr()
    t.deepEqual(
      await prraypromise(Promise.resolve(t4)).sort((a, b) => delay(100).then(() => a - b)),
      new Prray(...t4.sort((a, b) => a - b)),
    )
  }
})

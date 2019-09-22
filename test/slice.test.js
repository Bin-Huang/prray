import test from 'ava'
const { prraypromise, PrrayPromise } = require('../src/prraypromise')
const Prray = require('../src/prray')

const arr = [1,2,3,4,5,6,7,8,9]
const p = new Prray(arr)
const pp = prraypromise(Promise.resolve(arr))

test('prray slice', async (t) => {
  t.true(p.slice(1) instanceof Prray)

  t.deepEqual(p.slice(), new Prray(arr.slice()))

  t.deepEqual(p.slice(2), new Prray(arr.slice(2)))
  t.deepEqual(p.slice(undefined, 7), new Prray(arr.slice(undefined, 7)))
  t.deepEqual(p.slice(1,5), new Prray(arr.slice(1,5)))
  t.deepEqual(p.slice(4,100), new Prray(arr.slice(4,100)))
  t.deepEqual(p.slice(100,200), new Prray(arr.slice(100,200)))

  t.deepEqual(p.slice(-3), new Prray(arr.slice(-3)))
  t.deepEqual(p.slice(undefined, -4), new Prray(arr.slice(undefined, -4)))
  t.deepEqual(p.slice(-2, -5), new Prray(arr.slice(-2, -5)))
  t.deepEqual(p.slice(-5, -2), new Prray(arr.slice(-5, -2)))
  t.deepEqual(p.slice(-4,-100), new Prray(arr.slice(-4,-100)))
  t.deepEqual(p.slice(-100, -4), new Prray(arr.slice(-100, -4)))
  t.deepEqual(p.slice(-200, -100), new Prray(arr.slice(-200, -100)))

  t.deepEqual(p.slice(-7, 5), new Prray(arr.slice(-7, 5)))
  t.deepEqual(p.slice(1, -3), new Prray(arr.slice(1, -3)))
  t.deepEqual(p.slice(-1000, 3), new Prray(arr.slice(-1000, 3)))
  t.deepEqual(p.slice(-3, 1000), new Prray(arr.slice(-3, 1000)))
})

test('prraypromise slice', async (t) => {
  t.true(pp.slice(1) instanceof PrrayPromise)

  t.deepEqual(await pp.slice(), new Prray(arr.slice()))

  t.deepEqual(await pp.slice(2), new Prray(arr.slice(2)))
  t.deepEqual(await pp.slice(undefined, 7), new Prray(arr.slice(undefined, 7)))
  t.deepEqual(await pp.slice(1,5), new Prray(arr.slice(1,5)))
  t.deepEqual(await pp.slice(4,100), new Prray(arr.slice(4,100)))
  t.deepEqual(await pp.slice(100,200), new Prray(arr.slice(100,200)))

  t.deepEqual(await pp.slice(-3), new Prray(arr.slice(-3)))
  t.deepEqual(await pp.slice(undefined, -4), new Prray(arr.slice(undefined, -4)))
  t.deepEqual(await pp.slice(-2, -5), new Prray(arr.slice(-2, -5)))
  t.deepEqual(await pp.slice(-5, -2), new Prray(arr.slice(-5, -2)))
  t.deepEqual(await pp.slice(-4,-100), new Prray(arr.slice(-4,-100)))
  t.deepEqual(await pp.slice(-100, -4), new Prray(arr.slice(-100, -4)))
  t.deepEqual(await pp.slice(-200, -100), new Prray(arr.slice(-200, -100)))

  t.deepEqual(await pp.slice(-7, 5), new Prray(arr.slice(-7, 5)))
  t.deepEqual(await pp.slice(1, -3), new Prray(arr.slice(1, -3)))
  t.deepEqual(await pp.slice(-1000, 3), new Prray(arr.slice(-1000, 3)))
  t.deepEqual(await pp.slice(-3, 1000), new Prray(arr.slice(-3, 1000)))
})

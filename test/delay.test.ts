import test from 'ava'
import Prray from '../src/prray'
import { PrrayPromise } from '../src/prraypromise'
import { toPrrayPromise, isClose, noop, noopAsync } from './test-utils'

test('prray static delay', async t => {
  // delay 0ms
  let time = Date.now()
  await Prray.delay(0)
  t.assert(isClose(time, Date.now(), { threshold: 20 }))

  // delay 100ms
  time = Date.now()
  await Prray.delay(100)
  t.assert(isClose(time + 100, Date.now(), { threshold: 20 }))

  // delay 1s
  time = Date.now()
  await Prray.delay(1000)
  t.assert(isClose(time + 1000, Date.now(), { threshold: 20 }))

  // delay 3s
  time = Date.now()
  await Prray.delay(3000)
  t.assert(isClose(time + 3000, Date.now(), { threshold: 20 }))

  // the returned value should be a prraypromise
  t.assert(Prray.delay(100) instanceof PrrayPromise)

  // the resolved value should be a prray
  t.deepEqual(await Prray.delay(100), new Prray())
})

test('prray instance delay', async t => {
  const prray = new Prray<number>()

  // delay 0s
  let time = Date.now()
  await prray.delay(0)
  t.assert(isClose(time, Date.now(), { threshold: 20 }))

  // delay 100ms
  time = Date.now()
  await prray.delay(100)
  t.assert(isClose(time + 100, Date.now(), { threshold: 20 }))

  // delay 500ms
  time = Date.now()
  await prray.delay(500)
  t.assert(isClose(time + 500, Date.now(), { threshold: 20 }))

  // the resolved value should be the original prray
  t.is(await prray.delay(100), prray)
})

test('prraypromise delay', async t => {
  const prraypromise = toPrrayPromise([1, 2, 3, 4])

  // delay 0ms
  let time = Date.now()
  await prraypromise.delay(0)
  t.assert(isClose(time, Date.now(), { threshold: 20 }))

  // delay 100ms
  time = Date.now()
  await prraypromise.delay(100)
  t.assert(isClose(time + 100, Date.now(), { threshold: 20 }))

  // delay 500ms
  time = Date.now()
  await prraypromise.delay(500)
  t.assert(isClose(time + 500, Date.now(), { threshold: 20 }))

  // the resolved value should be a prray with original items
  t.deepEqual(await prraypromise.delay(100), Prray.from([1, 2, 3, 4]))
})

test('delay: real cases', async t => {
  // case1: the method chaining of multi-delays should works
  let time = Date.now()
  await Prray.delay(100)
    .delay(100)
    .delay(100)
    .delay(100)
  t.assert(isClose(time + 400, Date.now(), { threshold: 30 }))

  // case2: the method chaining of multi-delays should works
  const prray = Prray.from([1, 2, 3])
  time = Date.now()
  await prray
    .delay(100)
    .delay(100)
    .delay(100)
    .delay(100)
  t.assert(isClose(time + 400, Date.now(), { threshold: 30 }))

  // case3: the method chaining with other methods should works
  time = Date.now()
  await prray
    .delay(100)
    .map(noop)
    .mapAsync(noopAsync)
    .delay(100)
    .forEach(noop)
  t.assert(isClose(time + 200, Date.now(), { threshold: 30 }))
})

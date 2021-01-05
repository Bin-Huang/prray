import test from 'ava'
import Prray from '../src/prray'

test('prray delay', async t => {
  let time = Date.now()

  await Prray.delay(0)
  t.assert(isRoughlyEqual(time, Date.now()))

  await Prray.delay(50)
  t.assert(isRoughlyEqual(time + 50, Date.now()))

  time = Date.now()
  await Prray.delay(100)
  t.assert(isRoughlyEqual(time + 100, Date.now()))

  time = Date.now()
  await Prray.delay(500)
  t.assert(isRoughlyEqual(time + 500, Date.now()))

  time = Date.now()
  await Prray.delay(1000).concat('a', 'b')
  t.assert(isRoughlyEqual(time + 1000, Date.now()))
})

function isRoughlyEqual(a: number, b: number): boolean {
  return Math.abs(a - b) < 20
}

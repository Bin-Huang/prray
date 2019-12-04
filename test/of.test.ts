import test from 'ava'
import Prray from '../src/prray'

test('prray of', async t => {
  const p1 = Prray.of(1)
  t.true(p1 instanceof Prray)
  t.is(p1[0], 1)
  t.is(p1.length, 1)

  const p2 = Prray.of(1, 2, 3)
  t.true(p2 instanceof Prray)
  t.is(p2[0], 1)
  t.is(p2[1], 2)
  t.is(p2[2], 3)
  t.is(p2.length, 3)

  const p3 = Prray.of(undefined)
  t.true(p3 instanceof Prray)
  t.is(p3[0], undefined)
  t.is(p3.length, 1)
})

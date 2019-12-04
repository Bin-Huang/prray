import test from 'ava'
import Prray from '../src/prray'

test('prray from', async t => {
  const p1 = Prray.from('foo')
  t.true(p1 instanceof Prray)
  t.is(p1[0], 'f')
  t.is(p1[1], 'o')
  t.is(p1[2], 'o')
  t.is(p1.length, 3)

  const p2 = Prray.from(['foo', 1])
  t.true(p2 instanceof Prray)
  t.is(p2[0], 'foo')
  t.is(p2[1], 1)
  t.is(p2.length, 2)

  const p3 = Prray.from([1, 2, 3], x => x + x)
  t.true(p3 instanceof Prray)
  t.is(p3[0], 2)
  t.is(p3[1], 4)
  t.is(p3[2], 6)
  t.is(p3.length, 3)

  function f() {
    return Array.from(arguments)
  }
  const p4 = Prray.from((f as any)(1, 2, 3))
  t.true(p4 instanceof Prray)
  t.is(p4[0], 1)
  t.is(p4[1], 2)
  t.is(p4[2], 3)
  t.is(p4.length, 3)

  const p5 = Prray.from([1])
  t.true(p5 instanceof Prray)
  t.is(p5[0], 1)
  t.is(p5.length, 1)
})

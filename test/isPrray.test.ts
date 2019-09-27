import test from 'ava'
import { Prray, prray } from '../src/prray'

test('prray isPrray', async (t) => {
  t.true(Prray.isPrray(new Prray(1,2,3)))
  t.true(Prray.isPrray(Prray.of(1,2,3)))
  t.true(Prray.isPrray(Prray.from([1,2,3])))
  t.true(Prray.isPrray(prray([1,2,3])))

  t.false(Prray.isPrray([1,2,3]))
  t.false(Prray.isPrray(new Array(1,2,3)))
  t.false(Prray.isPrray({ foo: [1,2,3] }))
  t.false(Prray.isPrray('1,2,3'))
  t.false(Prray.isPrray(undefined))
  t.false(Prray.isPrray(null))
  t.false(Prray.isPrray(1))
  t.false(Prray.isPrray({}))
  t.false(Prray.isPrray(Object))
  t.false(Prray.isPrray(Prray))
  t.false(Prray.isPrray(console.log))
})

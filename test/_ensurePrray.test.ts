import test from 'ava'
import { _ensurePrray, Prray } from '../src/prray'

test('_ensurePrray', async (t) => {
  const arr = new Array()
  const prr = new Prray()

  t.true(_ensurePrray(arr) instanceof Prray)
  t.not(_ensurePrray(arr), arr)

  t.true(_ensurePrray(prr) instanceof Prray)
  t.is(_ensurePrray(prr), prr)
})

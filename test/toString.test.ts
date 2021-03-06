import test from 'ava'
import Prray from '../src/prray'
import { toPrrayPromise } from './test-utils'

test('prray toString', async t => {
  const arr = [1, 2, 3]
  const prr = Prray.from(arr)
  t.is(prr.toString(), arr.toString())
})

test('prraypromise toString', async t => {
  const arr = [1, 2, 3]
  const pp = toPrrayPromise(arr)
  t.is(await pp.toString(), arr.toString())
})

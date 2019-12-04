import test from 'ava'
import Prray from '../src/prray'
import { toPrrayPromise } from './test-utils'

test('prray toLocaleString', async t => {
  const arr = [1, 2, 3]
  const prr = Prray.from(arr)
  t.is(prr.toLocaleString(), arr.toLocaleString())
})

test('prraypromise toLocaleString', async t => {
  const arr = [1, 2, 3]
  const pp = toPrrayPromise(arr)
  t.is(await pp.toLocaleString(), arr.toLocaleString())
})

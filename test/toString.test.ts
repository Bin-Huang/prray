import test from 'ava'
import { prray } from '../src/prray'
import { toPrrayPromise } from './test-utils'

test('prray toString', async (t) => {
  const arr = [1,2,3]
  const prr = prray(arr)
  t.is(prr.toString(), arr.toString())
})

test('prraypromise toString', async (t) => {
  const arr = [1,2,3]
  const prr = prray(arr)
  t.is(await toPrrayPromise(prr).toString(), arr.toString())
})

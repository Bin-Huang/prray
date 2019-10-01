import test from 'ava'
import { toPrrayPromise, isEven } from './test-utils'

const p1 = toPrrayPromise([1, 2, 3, 4])
const p2 = toPrrayPromise([2, 4, 6])

test('prraypromise every', async t => {
  t.is(await p1.every(isEven), false)
  t.is(await p2.every(isEven), true)
})

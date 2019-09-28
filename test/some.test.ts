import test from 'ava'
import { toPrrayPromise, isEven } from './test-utils'

const p1 = toPrrayPromise([1,2,3,4])
const p2 = toPrrayPromise([1,3,5])

test('prraypromise some', async (t) => {
  t.is(await p1.some(isEven), true)
  t.is(await p2.some(isEven), false)
})

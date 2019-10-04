import test from 'ava'
import { toPrrayPromise } from './test-utils'

const pp = toPrrayPromise([1, 2, 3, 4])

test('prraypromise includes', async t => {
  t.is(await pp.includes(2), true)
  t.is(await pp.includes(10), false)
  t.is(await pp.includes(undefined as any), false)
  t.is(await pp.includes(2, 2), false)
  t.is(await pp.includes(2, 1), true)
})

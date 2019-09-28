import test from 'ava'
import { toPrrayPromise } from './test-utils'

const pp = toPrrayPromise([1,2,3,4])

test('prraypromise findIndex', async (t) => {
  t.is(await pp.findIndex((x) => x === 2), 1)
  t.is(await pp.findIndex((x) => x === 10), -1)
})

import test from 'ava'
import { toPrrayPromise } from './test-utils'

const pp = toPrrayPromise([1, 2, 3, 4])

test('prraypromise find', async t => {
  t.is(await pp.find(x => x === 2), 2)
  t.is(await pp.find(x => x === 10), undefined)
})

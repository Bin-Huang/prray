import test from 'ava'
import { prray } from '../src/prray'
import { toPrrayPromise } from './test-utils'

const p = prray([1, 2, 3, 4])
const pp = toPrrayPromise([1, 2, 3, 4])

test('prray join', async t => {
  t.is(p.join(), '1,2,3,4')
  t.is(p.join('-'), '1-2-3-4')
  t.is(p.join('xx'), '1xx2xx3xx4')
})

test('prraypromise join', async t => {
  t.is(await pp.join(), '1,2,3,4')
  t.is(await pp.join('-'), '1-2-3-4')
  t.is(await pp.join('xx'), '1xx2xx3xx4')
})

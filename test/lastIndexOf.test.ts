import test from 'ava'
import { toPrrayPromise } from './test-utils'
import { prray } from '../src/prray'

const p = prray(['a', 'b', 'c', 'd'])
const pp = toPrrayPromise(['a', 'b', 'c', 'd'])

test('prray lastIndexOf', async t => {
  t.is(p.lastIndexOf('c'), 2)
  t.is(p.lastIndexOf('z'), -1)
  t.is(p.lastIndexOf(undefined), -1)
  t.is(p.lastIndexOf('c', 2), 2)
  t.is(p.lastIndexOf('c', 1), -1)
})

test('prraypromise lastIndexOf', async t => {
  t.deepEqual(await pp, p)
  t.is(await pp.lastIndexOf('c'), 2)
  t.is(await pp.lastIndexOf('z'), -1)
  t.is(await pp.lastIndexOf(undefined), -1)
  t.is(await pp.lastIndexOf('c', 2), 2)
  t.is(await pp.lastIndexOf('c', 1), -1)
})

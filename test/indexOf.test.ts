import test from 'ava'
import { toPrrayPromise } from './test-utils'

const pp = toPrrayPromise(['a', 'x', 'b', 'c', 'd', 'x', 'e', 'f'])

test('prraypromise indexOf', async t => {
  t.is(await pp.indexOf('x'), 1)
  t.is(await pp.indexOf('y'), -1)
  t.is(await pp.indexOf(undefined), -1)
  t.is(await pp.indexOf('x', 2), 5)
  t.is(await pp.indexOf('x', 1), 1)
})

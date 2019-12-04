import test from 'ava'
import Prray from '../src/prray'
import { toPrrayPromise } from './test-utils'

const arr = ['a', 'b']

test('prray push', async t => {
  const prr = Prray.from(arr)

  t.is(prr.push('c'), 3)
  t.is(prr.push('d', 'e'), 5)
  t.deepEqual(prr, Prray.from(['a', 'b', 'c', 'd', 'e']))
})

test('prraypromise push', async t => {
  const prr = Prray.from(arr)
  const pp = toPrrayPromise(prr)

  t.is(await pp.push('c'), 3)
  t.is(await pp.push('d', 'e'), 5)
  t.deepEqual(prr, Prray.from(['a', 'b', 'c', 'd', 'e']))
})

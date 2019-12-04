import test from 'ava'
import Prray from '../src/prray'
import { toPrrayPromise } from './test-utils'

const arr = ['a', 'b']

test('prray unshift', async t => {
  const prr = Prray.from(arr)

  t.is(prr.unshift('c'), 3)
  t.is(prr.unshift('d', 'e'), 5)
  t.deepEqual(prr, Prray.from(['d', 'e', 'c', 'a', 'b']))
})

test('prraypromise unshift', async t => {
  const prr = Prray.from(arr)
  const pp = toPrrayPromise(prr)

  t.is(await pp.unshift('c'), 3)
  t.is(await pp.unshift('d', 'e'), 5)
  t.deepEqual(prr, Prray.from(['d', 'e', 'c', 'a', 'b']))
})

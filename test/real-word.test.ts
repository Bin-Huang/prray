import test from 'ava'
import Prray from '../src/index'
import { delay } from './test-utils'

test('Real world test 1', async t => {
  const p = await Prray.from([1, 2, 3])
    .map(v => v + 1)
    .mapAsync(v => delay(100).then(() => v + 2))
    .concat([4, 5, 6])
    .filterAsync(v => delay(100).then(() => v % 2 === 0))
    .toArray()
  const a = [1, 2, 3]
    .map(v => v + 1)
    .map(v => v + 2)
    .concat([4, 5, 6])
    .filter(v => v % 2 === 0)
  t.deepEqual(p, a)
})

test('Real world test 2', async t => {
  const p = await Prray.from(['e', 'a', 'f', 'd'])
    .mapAsync(v => v + v)
    .sortAsync()
    .join('---')
  const a = ['e', 'a', 'f', 'd']
    .map(v => v + v)
    .sort()
    .join('---')
  t.deepEqual(p, a)
})

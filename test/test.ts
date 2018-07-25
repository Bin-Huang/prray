import test from 'ava'
import { prraypromise } from '../src/prraypromise'
import { Prray } from '../src/prray'
import delay from 'delay'

const addAsync = (i: number) => delay(100).then(() => i + 1)

test('prraypromise mapAsync', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3,4]))
  t.deepEqual(await pp, [1,2,3,4])
  t.deepEqual(await pp.mapAsync(addAsync), [2,3,4,5])
  t.deepEqual(await pp.mapAsync(addAsync).mapAsync(addAsync), [3,4,5,6])
})

test('prray mapAsync', async (t) => {
  const p = new Prray(1,2,3,4)
  t.deepEqual(await p.mapAsync(addAsync), [2,3,4,5])
  t.deepEqual(await p.mapAsync(addAsync).mapAsync(addAsync), [3,4,5,6])
})
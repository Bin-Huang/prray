import test from 'ava'
import { Prray } from '../src/prray'

test('Compatibility with array: indexing', async t => {
  const arr = [1, 2, 3, 4]
  const prr = new Prray(1, 2, 3, 4)
  t.is(prr.length, arr.length)
  t.is(prr[1], arr[1])
  t.is(prr[prr.length - 1], arr[arr.length - 1])
})

test('Compatibility with array: stringify', async t => {
  const arr = [1, 2, 3, 4]
  const prr = new Prray(1, 2, 3, 4)
  t.is(prr.toString(), arr.toString())
  t.is(prr.toLocaleString(), arr.toLocaleString())
  t.is(JSON.stringify(prr), JSON.stringify(arr))
})

test('Compatibility with array: prototype', async t => {
  const arr = [1, 2, 3, 4]
  const prr = new Prray(1, 2, 3, 4)

  t.is(prr instanceof Prray, true)
  t.is(prr instanceof Array, true)

  t.is((prr as any).__proto__.__proto__, (arr as any).__proto__)

  t.is(Array.isArray(prr), true)
})

test('Compatibility with array: spread operator', async t => {
  const arr = [1, 2, 3, 4]
  const prr = new Prray(1, 2, 3, 4)
  t.deepEqual([...prr], [...arr])
})

test('Compatibility with array: for-index loop', async t => {
  const arr = ['a', 'b', 'c', 'd']
  const prr = new Prray('a', 'b', 'c', 'd')
  for (let ix = 0; ix < arr.length; ix++) {
    t.is(prr[ix], arr[ix])
  }
})

test('Compatibility with array: for-of loop', async t => {
  const arr = ['a', 'b', 'c', 'd']
  const prr = new Prray('a', 'b', 'c', 'd')
  let ix = 0
  for (const v of prr) {
    t.is(v, arr[ix++])
  }
})

test('Compatibility with array: for-in loop', async t => {
  const arr = ['a', 'b', 'c', 'd']
  const prr = new Prray('a', 'b', 'c', 'd')
  for (const key in prr) {
    t.is(prr[key], arr[key])
  }
})

test('Compatibility with array: iteration', async t => {
  const arr = ['a', 'b', 'c', 'd']
  const prr = new Prray('a', 'b', 'c', 'd')
  const pi = prr[Symbol.iterator]()
  const ai = arr[Symbol.iterator]()

  t.is(pi.next().value, ai.next().value)
  t.is(pi.next().done, ai.next().done)
  t.is(pi.next().value, ai.next().value)
  t.is(pi.next().done, ai.next().done)
  t.is(pi.next().value, ai.next().value)
  t.is(pi.next().done, ai.next().done)
  t.is(pi.next().value, ai.next().value)
  t.is(pi.next().done, ai.next().done)
})

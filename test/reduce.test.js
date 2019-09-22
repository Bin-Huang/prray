import test from 'ava'
const { prraypromise, PrrayPromise } = require('../src/prraypromise')
const { prray } = require('../src/prray')
const { delay } = require('./test-utils')

const func1 = (pre, c) => pre + c
const funcAsync1 = (pre, c) => delay(100).then(() => pre + c)

const func2 = (pre, c) => {
  pre.push(c + 1)
  return pre
}
const funcAsync2 = async (pre, c) => {
  await delay(100)
  pre.push(c + 1)
  return pre
}

test('prray reduce 1', async (t) => {
  const p = prray([1,2,3])

  // FIXME: 无法确定 reduce 的结果是不是数组，应该让 PrrayPromise 处理和兼容非数组的情况？
  t.true(p.reduce(func1) instanceof PrrayPromise)
  t.true(p.reduce(funcAsync1) instanceof PrrayPromise)

  t.deepEqual(await p.reduce(func1), [1,2,3].reduce(func1))
  t.deepEqual(await p.reduce(funcAsync1), [1,2,3].reduce(func1))

  t.deepEqual(await p.reduce(func1, 10), [1,2,3].reduce(func1, 10))
  t.deepEqual(await p.reduce(funcAsync1, 10), [1,2,3].reduce(func1, 10))
})

test('prray reduce 2', async (t) => {
  const p = prray([1,2,3])

  t.true(p.reduce(func2, []) instanceof PrrayPromise)
  t.true(p.reduce(funcAsync2, []) instanceof PrrayPromise)

  t.deepEqual(await p.reduce(func2, []), prray([1,2,3].reduce(func2, [])))
  t.deepEqual(await p.reduce(func2, []), prray([1,2,3].reduce(func2, [])))
})

test('prraypromise reduce 1', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3]))

  // FIXME: 无法确定 reduce 的结果是不是数组，应该让 PrrayPromise 处理和兼容非数组的情况？
  t.true(pp.reduce(func1) instanceof PrrayPromise)
  t.true(pp.reduce(funcAsync1) instanceof PrrayPromise)

  t.deepEqual(await pp.reduce(func1), [1,2,3].reduce(func1))
  t.deepEqual(await pp.reduce(funcAsync1), [1,2,3].reduce(func1))

  t.deepEqual(await pp.reduce(func1, 10), [1,2,3].reduce(func1, 10))
  t.deepEqual(await pp.reduce(funcAsync1, 10), [1,2,3].reduce(func1, 10))
})

test('prraypromise reduce 2', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3]))

  t.true(pp.reduce(func2, []) instanceof PrrayPromise)
  t.true(pp.reduce(funcAsync2, []) instanceof PrrayPromise)

  t.deepEqual(await pp.reduce(func2, []), prray([1,2,3].reduce(func2, [])))
  t.deepEqual(await pp.reduce(func2, []), prray([1,2,3].reduce(func2, [])))
})

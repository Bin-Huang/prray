import test from 'ava'
import * as utils from './test-utils'

test('test getError', async t => {
  function throwErr() {
    throw new Error('err')
  }
  t.deepEqual(await utils.getError(throwErr), new Error('err'))

  async function reject() {
    throw new Error('err')
  }
  t.deepEqual(await utils.getError(reject), new Error('err'))

  function success() {
    return 1
  }
  t.deepEqual(await utils.getError(success), null)

  async function resolve() {
    return 1
  }
  t.deepEqual(await utils.getError(resolve), null)
})

const pEvery = require('p-every')

const some = function (tester, concurrency) {
  const negate = async (item, ix) => !(await tester(item, ix))
  return this.then((r) => concurrency ? pEvery(r, negate, {concurrency}) : pEvery(r, negate)).then(r => !r)
}

module.exports = some

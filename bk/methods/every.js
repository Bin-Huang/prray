const pEvery = require('p-every')

module.exports = function (tester, concurrency) {
  return this.then((r) => concurrency ? pEvery(r, tester, {concurrency}) : pEvery(r, tester))
}

const pFilter = require('p-filter')
const { prraypromise } = require('../prraypromise')

module.exports = function (filterer, concurrency) {
  const prom = this.then((r) => concurrency ? pFilter(r, filterer, {concurrency}) : pFilter(r, filterer))
  return prraypromise(prom)
}

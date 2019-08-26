const pFilter = require('p-filter')
const prraypromise = require('../prraypromise')

function filter (filterer, concurrency) {
  const prom = this.then((r) => concurrency ? pFilter(r, filterer, {concurrency}) : pFilter(r, filterer))
  return prraypromise(prom)
}

module.exports = filter

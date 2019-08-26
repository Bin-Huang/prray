const pMap = require('p-map')
const prraypromise = require('../prraypromise')

function map (mapper, concurrency) {
  const prom = this.then((r) => concurrency ? pMap(r, mapper, {concurrency}) : pMap(r, mapper))
  return prraypromise(prom)
}

module.exports = map

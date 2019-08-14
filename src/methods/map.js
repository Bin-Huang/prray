const pMap = require('p-map')
import { prraypromise } from '../prraypromise.js'

export const map = function (mapper, concurrency) {
  const prom = this.then((r) => concurrency ? pMap(r, mapper, {concurrency}) : pMap(r, mapper))
  return prraypromise(prom)
}

const pMap = require('p-map')

class EndError extends Error {
	constructor(ele, ix) {
		super();
    this.ele = ele;
    this.ix = ix
	}
}

function _find(datas, tester, opts) {
  const finder = (ele, ix) => Promise.resolve(tester(ele, ix)).then((r) => {
    if (r) {
      throw new EndError(ele, ix)
    }
  })
  return pMap(datas, finder, opts).then(() => null).catch((r) => {
    if (r instanceof EndError) {
      return r
    }
    return null
  })
}

const findIndex = function (tester, concurrency) {
    return this.then((r) => concurrency ? _find(r, tester, {concurrency}) : _find(r, tester))
        .then((r) => r === null ? -1 : r.ix)
}

const find = function (tester, concurrency) {
    return this.then((r) => concurrency ? _find(r, tester, {concurrency}) : _find(r, tester))
        .then((r) => r === null ? null : r.ele)
}

module.exports = { findIndex, find }

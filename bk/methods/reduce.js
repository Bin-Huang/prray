async function _reduce(datas, reducer, init) {
  // TODO: Better implementation
  let result
  let slices
  if (init === undefined) {
    result = datas[0]
    slices = datas.slice(1)
  } else {
    result = init
    slices = datas
  }
  for (let ix = 0; ix < slices.length; ix ++) {
    result = await reducer(result, slices[ix], ix)
  }
  return result
}

const reduce = function (reducer, initialValue) {
  const prom = this.then((r) => _reduce(r, reducer, initialValue))
  return prom // TODO: if return promise<array>, returns prraypromise<array>???
}

module.exports = reduce

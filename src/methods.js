async function map(arr, func) {
  const result = []
  for (let ix = 0; ix < arr.length; ix++) {
    const v = arr[ix]
    result.push(func(v, ix))
  }
  return Promise.all(result)
}

async function filter(arr, func) {
  const result = []
  const conds = await map(arr, func)
  for (let ix = 0; ix < arr.length; ix++) {
    const v = arr[ix]
    if (conds[ix]) {
      result.push(v)
    }
  }
  return result
}

// TODO: 
function reduce(arr, func, initialValue) {
  let result = initialValue
  for (let ix = 0; ix < arr.length; ix++) {
    const v = arr[ix]
    result = func(result, v, ix)
  }
  return result
}

async function findIndex(arr, func) {
  const conds = await map(arr, func)  // 可以优化
  for (let ix = 0; ix < conds.length; ix++) {
    if (conds[ix]) {
      return ix
    }
  }
  return -1
}

async function find(arr, func) {
  const conds = await map(arr, func)  // 可以优化
  for (let ix = 0; ix < conds.length; ix++) {
    if (conds[ix]) {
      return arr[ix]
    }
  }
  return undefined
}

module.exports = {
  map,
  filter,
  reduce,
  find,
  findIndex,
}
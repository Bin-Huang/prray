import { IMapCallback, ITester } from './types'

async function map<T, U>(arr: any, func: IMapCallback<T, U>) {
  const result = []
  for (let ix = 0; ix < arr.length; ix++) {
    const v = arr[ix]
    result.push(func(v, ix, arr))
  }
  return Promise.all(result)
}

async function filter<T>(arr: any, func: ITester<T>) {
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

async function reduce(arr: any, func: any, initialValue: any) {
  let pre = initialValue
  let ix = 0
  if (initialValue === undefined) {
    pre = arr[0]
    ix = 1
  }
  for (ix; ix < arr.length; ix++) {
    const current = arr[ix]
    pre = await func(pre, current, ix, arr)
  }
  return pre
}

async function reduceRight(arr: any, func: any, initialValue: any) {
  let pre = initialValue
  let ix = arr.length - 1
  if (initialValue === undefined) {
    pre = arr[arr.length - 1]
    ix = arr.length - 2
  }
  for (ix; ix >= 0; ix--) {
    const current = arr[ix]
    pre = await func(pre, current, ix, arr)
  }
  return pre
}

async function findIndex(arr: any, func: any) {
  const conds = await map(arr, func)  // 可以优化
  for (let ix = 0; ix < conds.length; ix++) {
    if (conds[ix]) {
      return ix
    }
  }
  return -1
}

async function find(arr: any, func: any) {
  const conds = await map(arr, func)  // 可以优化
  for (let ix = 0; ix < conds.length; ix++) {
    if (conds[ix]) {
      return arr[ix]
    }
  }
  return undefined
}

async function every(arr: any, func: any) {
  const conds = await map(arr, func)  // 可以优化
  for (const cond of conds) {
    if (!cond) {
      return false
    }
  }
  return true
}

async function some(arr: any, func: any) {
  const conds = await map(arr, func)  // 可以优化
  for (const cond of conds) {
    if (cond) {
      return true
    }
  }
  return false
}

async function sort(arr: any, func: any) {
  if (!func) {
    return [...arr].sort()
  }
  if (arr.length < 2) {
    return arr
  }
  // 插入排序
  for(let i = 1;i < arr.length; i++){
    for(let j = 0;j<i;j++){
      if ((await func(arr[i], arr[j])) < 0) {
        arr.splice(j,0,arr[i]);
        arr.splice(i+1,1);
        break;
      }
    }
  }
  return arr
}

async function forEach(arr: any, func: any) {
  await map(arr, func)
}

function slice(arr: any, start = 0, end = Infinity) {
  if (start === 0 && end === Infinity) {
    return arr
  }
  if (start > arr.length) {
    start = arr.length
  }
  if (start < - arr.length) {
    start = - arr.length
  }
  if (end > arr.length) {
    end = arr.length
  }
  if (end < - arr.length) {
    end = - arr.length
  }
  if (start < 0) {
    start = arr.length + start
  }
  if (end < 0) {
    end = arr.length + end
  }
  const result = []
  for (let ix = start; ix < end; ix ++) {
    result.push(arr[ix])
  }
  return result
}

export {
  map,
  filter,
  reduce,
  reduceRight,
  find,
  findIndex,
  every,
  some,
  forEach,
  sort,
  slice,
}
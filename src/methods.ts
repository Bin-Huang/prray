import { IMapCallback, ITester } from './types'

export async function map<T, U>(arr: any, func: IMapCallback<T, U>) {
  const result = []
  for (let ix = 0; ix < arr.length; ix++) {
    const v = arr[ix]
    result.push(func(v, ix, arr))
  }
  return Promise.all(result)
}

export async function filter<T>(arr: any, func: ITester<T>) {
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

export async function reduce(arr: any, func: any, initialValue: any) {
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

export async function reduceRight(arr: any, func: any, initialValue: any) {
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

export async function findIndex(arr: any, func: any) {
  const conds = await map(arr, func)  // 可以优化
  for (let ix = 0; ix < conds.length; ix++) {
    if (conds[ix]) {
      return ix
    }
  }
  return -1
}

export async function find(arr: any, func: any) {
  const conds = await map(arr, func)  // 可以优化
  for (let ix = 0; ix < conds.length; ix++) {
    if (conds[ix]) {
      return arr[ix]
    }
  }
  return undefined
}

export async function every(arr: any, func: any) {
  const conds = await map(arr, func)  // 可以优化
  for (const cond of conds) {
    if (!cond) {
      return false
    }
  }
  return true
}

export async function some(arr: any, func: any) {
  const conds = await map(arr, func)  // 可以优化
  for (const cond of conds) {
    if (cond) {
      return true
    }
  }
  return false
}

export async function sort(arr: any, func: any) {
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

export async function forEach(arr: any, func: any) {
  await map(arr, func)
}

export function slice(arr: any, start = 0, end = Infinity) {
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

export function loop<T>(
  array: T[],
  func: (value: T, index: number, array: T[], breakLoop: () => any) => any,
  { concurrency= Infinity },
) {
  if (array.length <= concurrency) {
    const promises = array.map((v, ix) => func(v, ix, array, () => null))
    return Promise.all(promises)
  }

	return new Promise((resolve, reject) => {
    const length = array.length
    if (length === 0) {
      resolve()
    }

    let isEnding = false
    let currentIndex = 0
    let workingNum = Math.min(concurrency, length)
    
    const breakLoop = () => {
      isEnding = true
      resolve()
    }

		const woker = async () => {
      while (!isEnding && currentIndex < length) {
        const ix = currentIndex++
        try {
          await func(array[ix], ix, array, breakLoop)
        } catch (error) {
          isEnding = true
          reject(error)
          return
        }
      }
      workingNum --
      if (workingNum === 0) {
        resolve()
      }
		}

		for (let i = 0; i < Math.min(concurrency, length); i++) {
      woker()
		}
	})
}

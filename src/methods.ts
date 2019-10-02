import { Prray } from './prray'

export async function mapAsync<T, U>(
  arr: Prray<T>,
  func: (currentValue: T, index: number, array: Prray<T>) => Promise<U> | U,
): Promise<U[]> {
  const result: U[] = []
  await loop<T>(arr, async (value, ix) => (result[ix] = await func(value, ix, arr)), {})
  return result
}

export function map<T, U>(prr: Prray<T>, func: (currentValue: T, index: number, array: Prray<T>) => U): U[] {
  const result: U[] = []
  for (let ix = 0; ix < prr.length; ix++) {
    result.push(func(prr[ix], ix, prr))
  }
  return result
}

export async function filterAsync<T>(
  arr: Prray<T>,
  func: (currentValue: T, index: number, array: Prray<T>) => Promise<boolean> | boolean,
): Promise<T[]> {
  const result: T[] = []
  await loop(arr, async (value, ix) => ((await func(value, ix, arr)) ? result.push(value) : null), {})
  return result
}

export function filter<T>(prr: Prray<T>, func: (currentValue: T, index: number, array: Prray<T>) => boolean): T[] {
  const result: T[] = []
  for (let ix = 0; ix < prr.length; ix++) {
    const value = prr[ix]
    if (func(value, ix, prr)) {
      result.push(value)
    }
  }
  return result
}

export async function reduceAsync<T>(
  prr: Prray<T>,
  func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T | Promise<T>,
): Promise<T>
export async function reduceAsync<T>(
  prr: Prray<T>,
  func: (accumulator: T, currentValue: T, index: number, prray: Prray<T>) => T | Promise<T>,
  initialValue: T,
): Promise<T>
export async function reduceAsync<T, U>(
  prr: Prray<T>,
  func: (accumulator: U, currentValue: T, index: number, prray: Prray<T>) => U | Promise<U>,
  initialValue: U,
): Promise<U>
export async function reduceAsync<T>(
  prr: Prray<T>,
  func: (accumulator: any, currentValue: T, index: number, prray: Prray<T>) => any | Promise<any>,
  initialValue?: any,
): Promise<any> {
  let pre = initialValue
  let ix = 0
  if (initialValue === undefined) {
    pre = prr[0]
    ix = 1
  }
  for (ix; ix < prr.length; ix++) {
    const current = prr[ix]
    pre = await func(pre, current, ix, prr)
  }
  return pre
}

export function reduce<T>(
  prr: Prray<T>,
  func: (accumulator: T, currentValue: T, index: number, array: Prray<T>) => T,
): T
export function reduce<T>(
  prr: Prray<T>,
  func: (accumulator: T, currentValue: T, index: number, array: Prray<T>) => T,
  initialValue: T,
): T
export function reduce<T, U>(
  prr: Prray<T>,
  func: (accumulator: U, currentValue: T, index: number, array: Prray<T>) => U,
  initialValue: U,
): U
export function reduce<T>(
  prr: Prray<T>,
  func: (accumulator: any, currentValue: T, index: number, array: Prray<T>) => any,
  initialValue?: any,
): any {
  let pre = initialValue
  let ix = 0
  if (initialValue === undefined) {
    pre = prr[0]
    ix = 1
  }
  for (ix; ix < prr.length; ix++) {
    const current = prr[ix]
    pre = func(pre, current, ix, prr)
  }
  return pre
}

export async function reduceRight<T>(
  arr: Prray<T>,
  func: (preValue: T, currentValue: T, index: number, array: Prray<T>) => Promise<T> | T,
): Promise<T[]>
export async function reduceRight<T, U>(
  arr: Prray<T>,
  func: (preValue: U, currentValue: T, index: number, array: Prray<T>) => Promise<U> | U,
  initialValue?: U,
): Promise<U[]>
export async function reduceRight<T>(
  arr: Prray<T>,
  func: (preValue: any, currentValue: T, index: number, array: Prray<T>) => Promise<any> | any,
  initialValue?: any,
): Promise<any[]> {
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

export async function findIndexAsync<T>(
  arr: Prray<T>,
  func: (currentValue: T, index: number, array: Prray<T>) => Promise<boolean> | boolean,
): Promise<number> {
  let result = -1
  await loop(
    arr,
    async (value, ix, _, breakLoop) => {
      if (await func(value, ix, arr)) {
        result = ix
        breakLoop()
      }
    },
    {},
  )
  return result
}

export function findIndex<T>(
  prr: Prray<T>,
  func: (currentValue: T, index: number, array: Prray<T>) => boolean,
): number {
  const length = prr.length
  for (let ix = 0; ix < length; ix++) {
    if (func(prr[ix], ix, prr)) {
      return ix
    }
  }
  return -1
}

export async function findAsync<T>(
  arr: Prray<T>,
  func: (currentValue: T, index: number, array: Prray<T>) => Promise<boolean> | boolean,
): Promise<T | undefined> {
  let result: T | undefined
  await loop(
    arr,
    async (value, ix, _, breakLoop) => {
      if (await func(value, ix, arr)) {
        result = value
        breakLoop()
      }
    },
    {},
  )
  return result
}

export function find<T>(
  prr: Prray<T>,
  func: (currentValue: T, index: number, array: Prray<T>) => boolean,
): T | undefined {
  const length = prr.length
  for (let ix = 0; ix < length; ix++) {
    if (func(prr[ix], ix, prr)) {
      return prr[ix]
    }
  }
  return undefined
}

export async function every<T>(
  arr: Prray<T>,
  func: (currentValue: T, index: number, array: Prray<T>) => Promise<boolean> | boolean,
): Promise<boolean> {
  let result = true
  await loop(
    arr,
    async (value, ix, _, breakLoop) => {
      if (!(await func(value, ix, arr))) {
        result = false
        breakLoop()
      }
    },
    {},
  )
  return result
}

export async function some<T>(
  arr: Prray<T>,
  func: (currentValue: T, index: number, array: Prray<T>) => Promise<boolean> | boolean,
): Promise<boolean> {
  let result = false
  await loop(
    arr,
    async (value, ix, _, breakLoop) => {
      if (await func(value, ix, arr)) {
        result = true
        breakLoop()
      }
    },
    {},
  )
  return result
}

export async function sort<T>(arr: Prray<T>, func?: (a: T, b: T) => Promise<number> | number): Promise<T[]> {
  if (!func) {
    return [...arr].sort()
  }
  if (arr.length < 2) {
    return arr
  }
  // 插入排序
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if ((await func(arr[i], arr[j])) < 0) {
        arr.splice(j, 0, arr[i])
        arr.splice(i + 1, 1)
        break
      }
    }
  }
  return arr
}

export async function forEachAsync<T>(
  prr: Prray<T>,
  func: (currentValue: T, index: number, prray: Prray<T>) => Promise<any> | any,
): Promise<undefined> {
  await loop(prr, async (value, ix) => func(value, ix, prr), {})
  return
}

export function forEach<T>(prr: Prray<T>, func: (currentValue: T, index: number, prray: Prray<T>) => any): undefined {
  for (let ix = 0; ix < prr.length; ix++) {
    func(prr[ix], ix, prr)
  }
  return
}

export function slice<T>(arr: Prray<T>, start = 0, end = Infinity): T[] {
  if (start === 0 && end === Infinity) {
    return arr
  }
  if (start > arr.length) {
    start = arr.length
  }
  if (start < -arr.length) {
    start = -arr.length
  }
  if (end > arr.length) {
    end = arr.length
  }
  if (end < -arr.length) {
    end = -arr.length
  }
  if (start < 0) {
    start = arr.length + start
  }
  if (end < 0) {
    end = arr.length + end
  }
  const result = []
  for (let ix = start; ix < end; ix++) {
    result.push(arr[ix])
  }
  return result
}

export function loop<T>(
  array: Prray<T>,
  func: (value: T, index: number, array: Prray<T>, breakLoop: () => any) => any,
  { concurrency = Infinity },
) {
  // FEATURE: options { concurrency, timeout, retries, defaults, fallback }

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
      workingNum--
      if (workingNum === 0) {
        resolve()
      }
    }

    for (let i = 0; i < Math.min(concurrency, length); i++) {
      woker()
    }
  })
}

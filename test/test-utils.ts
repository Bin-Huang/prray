import { prraypromise, PrrayPromise } from '../src/prraypromise'
import { prray, Prray } from '../src/prray'

export const isGte3Async = (v: number) => delay(100).then(() => v >= 3)
export const isGte3 = (v: number) => v >= 3

export const isEven = (i: number) => i % 2 === 0
export const isEvenAsync = (i: number) => delay(100).then(() => i % 2 === 0)

export const addOneAsync = (i: number) => delay(100).then(() => i + 1)
export const addOne = (i: number) => i + 1

/**
 * Returns a promise that will resolved after special time.
 */
export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Generate array with random numbers in special length.
 */
export function genRandArr(len = 5) {
  const ret: number[] = []
  for (let i = 0; i < len; i++) {
    ret.push(Math.random())
  }
  return ret
}

export function timer(): () => number {
  const startAt = Date.now()
  return () => {
    return Date.now() - startAt
  }
}

/**
 * Returns a prraypromise resolved with special array.
 */
export function toPrrayPromise<T>(arr: T[]): PrrayPromise<T> {
  if (arr instanceof Prray) {
    return prraypromise(Promise.resolve(arr as Prray<T>))
  }
  return prraypromise(Promise.resolve(prray(arr)))
}

export function isClose(n1: number, n2: number, opt = { threshold: 100 }): boolean {
  return Math.abs(n1 - n2) < opt.threshold
}

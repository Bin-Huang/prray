import { IMethods, methods } from './methods/index'

export type PrrayPromise<T> = Promise<T[]> & IMethods

export function prraypromise<T>(promise: Promise<T[]>): PrrayPromise<T> {
  const p: PrrayPromise<T> = promise as any

  // monkey patch
  for (const name in methods) {
    p[name] = methods[name]
  }

  return p
}

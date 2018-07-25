import * as pMap from 'p-map'

export interface PPromise<T> extends Promise<T> {

}

export function ppromise<T>(promise: Promise<T>): PPromise<T> {
  return promise
}

export function pipe<T, U>(
  promise: Promise<T>,
  func: (v: T) => Promise<U> | U,
): Promise<U> {
  return promise.then(func)
}

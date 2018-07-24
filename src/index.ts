class Prray<T> extends Array {
  constructor(...arr: T[]) {
    super(...arr as any)
  }
  toArray() {
    return [ ...this ]
  }
}

export default async function P<T>(datas: T[]): Promise<Prray<T>> {
  return new Prray(datas)
}

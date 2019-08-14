export type ITester<T> = (item: T, index: number) => boolean | Promise<boolean>

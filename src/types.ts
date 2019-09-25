import { Prray } from './prray'

export type IMapCallback<T, U> = (currentValue: T, currentIndex: number, prray: Prray<T>) => U | Promise<U>

export type ITester<T> = (currentValue: T, currentIndex: number, prray: Prray<T>) => boolean | Promise<boolean>

export type IReduceCallback<T, U> = (pre: U, currentValue: T, currentIndex: number, prray: Prray<T>) => U | Promise<U>

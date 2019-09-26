import { Prray } from './prray'

export type IMapCallback<T, U> = (currentValue: T, currentIndex: number, array: T[]) => U | Promise<U>

export type ICallback<T> = (currentValue: T, currentIndex: number, array: T[]) => any

export type ITester<T> = (currentValue: T, currentIndex: number, array: T[]) => boolean | Promise<boolean>

export type IReduceCallback<T, U> = (pre: U, currentValue: T, currentIndex: number, array: T[]) => U | Promise<U>

import * as pMap from 'p-map'
import * as Bluebird from 'bluebird'
import { delay, genRandArr, timer } from './test-utils'
import { loop } from '../src/methods'

main()

async function main() {
  await benchmark(100, 10)
  await benchmark(1000, 20)
  await benchmark(10000, 100)
  await benchmark(10000, 1000)
  await benchmark(1000000, 10000)
  await benchmark(1000000, 100000)

  await benchmark(100, 10000)
  await benchmark(10000, 10000)
  await benchmark(100000, Infinity)
}

async function benchmark(length: number, concurrency: number) {
  console.log(`length: ${length}, concurrency: ${concurrency}`)
  console.log(`loop: ${await loopBenchmark(length, concurrency)}ms, p-map: ${await pMapBenchmark(length, concurrency)}ms, bluebird: ${await bluebirdBenchmark(length, concurrency)}ms`)
  console.log(`--------------------------`)
}

async function loopBenchmark(length: number, concurrency: number): Promise<number> {
  const arr = genRandArr(length)
  const result = []

  const record = timer()
  await loop(arr, async (v,ix) => {
    await delay(100)
    result[ix] = v
  }, { concurrency })

  return record()
}

async function pMapBenchmark(length: number, concurrency: number): Promise<number> {
  const arr = genRandArr(length)
  const record = timer()

  await pMap(arr, async (v) => {
    await delay(100)
    return v
  }, { concurrency })

  return record()
}

async function bluebirdBenchmark(length: number, concurrency: number): Promise<number> {
  const arr = genRandArr(length)
  const record = timer()

  await Bluebird.map(arr, async (v) => {
    await delay(100)
    return v
  }, { concurrency })

  return record()
}
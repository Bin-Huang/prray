import test from 'ava'
import 'source-map-support/register'
import { prray } from '../src/prray'
import { toPrrayPromise } from './test-utils'

test('prray splice 1', async (t) => {
  const prr = prray(["angel", "clown", "mandarin", "sturgeon"])
  t.deepEqual(prr.splice(2, 0, "drum"), prray([]))
  t.deepEqual(prr, prray(["angel", "clown", "drum", "mandarin", "sturgeon"]))
})

test('prray splice 2', async (t) => {
  const prr = prray(['angel', 'clown', 'mandarin', 'sturgeon'])
  t.deepEqual(prr.splice(2, 0, 'drum', 'guitar'), prray([]))
  t.deepEqual(prr, prray(["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]))
})

test('prray splice 3', async (t) => {
  const prr = prray(['angel', 'clown', 'drum', 'mandarin', 'sturgeon'])
  t.deepEqual(prr.splice(3, 1), prray(["mandarin"]))
  t.deepEqual(prr, prray(["angel", "clown", "drum", "sturgeon"]))
})

test('prray splice 4', async (t) => {
  const prr = prray(['angel', 'clown', 'drum', 'sturgeon'])
  t.deepEqual(prr.splice(2, 1, "trumpet"), prray(["drum"]))
  t.deepEqual(prr, prray(["angel", "clown", "trumpet", "sturgeon"]))
})

test('prray splice 5', async (t) => {
  const prr = prray(['angel', 'clown', 'trumpet', 'sturgeon'])
  t.deepEqual(prr.splice(0, 2, 'parrot', 'anemone', 'blue'), prray(["angel", "clown"]))
  t.deepEqual(prr, prray(["parrot", "anemone", "blue", "trumpet", "sturgeon"]))
})

test('prray splice 6', async (t) => {
  const prr = prray(['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'])
  t.deepEqual(prr.splice(prr.length - 3, 2), prray(["blue", "trumpet"]))
  t.deepEqual(prr, prray(["parrot", "anemone", "sturgeon"]))
})

test('prray splice 7', async (t) => {
  const prr = prray(['angel', 'clown', 'mandarin', 'sturgeon'])
  t.deepEqual(prr.splice(-2, 1), prray(["mandarin"]))
  t.deepEqual(prr, prray(["angel", "clown", "sturgeon"]))
})

test('prray splice 8', async (t) => {
  const prr = prray(['angel', 'clown', 'mandarin', 'sturgeon'])
  t.deepEqual(prr.splice(2), prray(["mandarin", "sturgeon"]))
  t.deepEqual(prr, prray(["angel", "clown"]))
})

test('prraypromise splice 1', async (t) => {
  const prr = prray(["angel", "clown", "mandarin", "sturgeon"])
  const pp = toPrrayPromise(prr)
  t.deepEqual(await pp.splice(2, 0, "drum"), prray([]))
  t.deepEqual(prr, prray(["angel", "clown", "drum", "mandarin", "sturgeon"]))
})

test('prraypromise splice 2', async (t) => {
  const prr = prray(['angel', 'clown', 'mandarin', 'sturgeon'])
  const pp = toPrrayPromise(prr)
  t.deepEqual(await pp.splice(2, 0, 'drum', 'guitar'), prray([]))
  t.deepEqual(prr, prray(["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]))
})

test('prraypromise splice 3', async (t) => {
  const prr = prray(['angel', 'clown', 'drum', 'mandarin', 'sturgeon'])
  const pp = toPrrayPromise(prr)
  t.deepEqual(await pp.splice(3, 1), prray(["mandarin"]))
  t.deepEqual(prr, prray(["angel", "clown", "drum", "sturgeon"]))
})

test('prraypromise splice 4', async (t) => {
  const prr = prray(['angel', 'clown', 'drum', 'sturgeon'])
  const pp = toPrrayPromise(prr)
  t.deepEqual(await pp.splice(2, 1, "trumpet"), prray(["drum"]))
  t.deepEqual(prr, prray(["angel", "clown", "trumpet", "sturgeon"]))
})

test('prraypromise splice 5', async (t) => {
  const prr = prray(['angel', 'clown', 'trumpet', 'sturgeon'])
  const pp = toPrrayPromise(prr)
  t.deepEqual(await pp.splice(0, 2, 'parrot', 'anemone', 'blue'), prray(["angel", "clown"]))
  t.deepEqual(prr, prray(["parrot", "anemone", "blue", "trumpet", "sturgeon"]))
})

test('prraypromise splice 6', async (t) => {
  const prr = prray(['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'])
  const pp = toPrrayPromise(prr)
  t.deepEqual(await pp.splice(prr.length - 3, 2), prray(["blue", "trumpet"]))
  t.deepEqual(prr, prray(["parrot", "anemone", "sturgeon"]))
})

test('prraypromise splice 7', async (t) => {
  const prr = prray(['angel', 'clown', 'mandarin', 'sturgeon'])
  const pp = toPrrayPromise(prr)
  t.deepEqual(await pp.splice(-2, 1), prray(["mandarin"]))
  t.deepEqual(prr, prray(["angel", "clown", "sturgeon"]))
})

test('prraypromise splice 8', async (t) => {
  const prr = prray(['angel', 'clown', 'mandarin', 'sturgeon'])
  const pp = toPrrayPromise(prr)
  t.deepEqual(await  pp.splice(2), prray(["mandarin", "sturgeon"]))
  t.deepEqual(prr, prray(["angel", "clown"]))
})

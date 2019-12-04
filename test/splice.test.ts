import test from 'ava'
import 'source-map-support/register'
import Prray from '../src/prray'
import { toPrrayPromise } from './test-utils'

test('prray splice 1', async t => {
  const prr = Prray.from(['angel', 'clown', 'mandarin', 'sturgeon'])
  t.deepEqual(prr.splice(2, 0, 'drum'), Prray.from([]))
  t.deepEqual(prr, Prray.from(['angel', 'clown', 'drum', 'mandarin', 'sturgeon']))
})

test('prray splice 2', async t => {
  const prr = Prray.from(['angel', 'clown', 'mandarin', 'sturgeon'])
  t.deepEqual(prr.splice(2, 0, 'drum', 'guitar'), Prray.from([]))
  t.deepEqual(prr, Prray.from(['angel', 'clown', 'drum', 'guitar', 'mandarin', 'sturgeon']))
})

test('prray splice 3', async t => {
  const prr = Prray.from(['angel', 'clown', 'drum', 'mandarin', 'sturgeon'])
  t.deepEqual(prr.splice(3, 1), Prray.from(['mandarin']))
  t.deepEqual(prr, Prray.from(['angel', 'clown', 'drum', 'sturgeon']))
})

test('prray splice 4', async t => {
  const prr = Prray.from(['angel', 'clown', 'drum', 'sturgeon'])
  t.deepEqual(prr.splice(2, 1, 'trumpet'), Prray.from(['drum']))
  t.deepEqual(prr, Prray.from(['angel', 'clown', 'trumpet', 'sturgeon']))
})

test('prray splice 5', async t => {
  const prr = Prray.from(['angel', 'clown', 'trumpet', 'sturgeon'])
  t.deepEqual(prr.splice(0, 2, 'parrot', 'anemone', 'blue'), Prray.from(['angel', 'clown']))
  t.deepEqual(prr, Prray.from(['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon']))
})

test('prray splice 6', async t => {
  const prr = Prray.from(['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'])
  t.deepEqual(prr.splice(prr.length - 3, 2), Prray.from(['blue', 'trumpet']))
  t.deepEqual(prr, Prray.from(['parrot', 'anemone', 'sturgeon']))
})

test('prray splice 7', async t => {
  const prr = Prray.from(['angel', 'clown', 'mandarin', 'sturgeon'])
  t.deepEqual(prr.splice(-2, 1), Prray.from(['mandarin']))
  t.deepEqual(prr, Prray.from(['angel', 'clown', 'sturgeon']))
})

test('prray splice 8', async t => {
  const prr = Prray.from(['angel', 'clown', 'mandarin', 'sturgeon'])
  t.deepEqual(prr.splice(2), Prray.from(['mandarin', 'sturgeon']))
  t.deepEqual(prr, Prray.from(['angel', 'clown']))
})

test('prraypromise splice 1', async t => {
  const prr = Prray.from(['angel', 'clown', 'mandarin', 'sturgeon'])
  const pp = toPrrayPromise(prr)
  t.deepEqual(await pp.splice(2, 0, 'drum'), Prray.from([]))
  t.deepEqual(prr, Prray.from(['angel', 'clown', 'drum', 'mandarin', 'sturgeon']))
})

test('prraypromise splice 2', async t => {
  const prr = Prray.from(['angel', 'clown', 'mandarin', 'sturgeon'])
  const pp = toPrrayPromise(prr)
  t.deepEqual(await pp.splice(2, 0, 'drum', 'guitar'), Prray.from([]))
  t.deepEqual(prr, Prray.from(['angel', 'clown', 'drum', 'guitar', 'mandarin', 'sturgeon']))
})

test('prraypromise splice 3', async t => {
  const prr = Prray.from(['angel', 'clown', 'drum', 'mandarin', 'sturgeon'])
  const pp = toPrrayPromise(prr)
  t.deepEqual(await pp.splice(3, 1), Prray.from(['mandarin']))
  t.deepEqual(prr, Prray.from(['angel', 'clown', 'drum', 'sturgeon']))
})

test('prraypromise splice 4', async t => {
  const prr = Prray.from(['angel', 'clown', 'drum', 'sturgeon'])
  const pp = toPrrayPromise(prr)
  t.deepEqual(await pp.splice(2, 1, 'trumpet'), Prray.from(['drum']))
  t.deepEqual(prr, Prray.from(['angel', 'clown', 'trumpet', 'sturgeon']))
})

test('prraypromise splice 5', async t => {
  const prr = Prray.from(['angel', 'clown', 'trumpet', 'sturgeon'])
  const pp = toPrrayPromise(prr)
  t.deepEqual(await pp.splice(0, 2, 'parrot', 'anemone', 'blue'), Prray.from(['angel', 'clown']))
  t.deepEqual(prr, Prray.from(['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon']))
})

test('prraypromise splice 6', async t => {
  const prr = Prray.from(['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'])
  const pp = toPrrayPromise(prr)
  t.deepEqual(await pp.splice(prr.length - 3, 2), Prray.from(['blue', 'trumpet']))
  t.deepEqual(prr, Prray.from(['parrot', 'anemone', 'sturgeon']))
})

test('prraypromise splice 7', async t => {
  const prr = Prray.from(['angel', 'clown', 'mandarin', 'sturgeon'])
  const pp = toPrrayPromise(prr)
  t.deepEqual(await pp.splice(-2, 1), Prray.from(['mandarin']))
  t.deepEqual(prr, Prray.from(['angel', 'clown', 'sturgeon']))
})

test('prraypromise splice 8', async t => {
  const prr = Prray.from(['angel', 'clown', 'mandarin', 'sturgeon'])
  const pp = toPrrayPromise(prr)
  t.deepEqual(await pp.splice(2), Prray.from(['mandarin', 'sturgeon']))
  t.deepEqual(prr, Prray.from(['angel', 'clown']))
})

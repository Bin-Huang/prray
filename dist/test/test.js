"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const prraypromise_1 = require("../src/prraypromise");
const prray_1 = require("../src/prray");
const delay_1 = __importDefault(require("delay"));
const src_1 = __importDefault(require("../src"));
ava_1.default('array compatibility', (t) => {
    const p = new prray_1.Prray(1, 2, 3, 4);
    t.is(Array.isArray(p), true);
    t.is(p instanceof prray_1.Prray, true);
    t.is(p instanceof Array, true);
    t.is(p.length, 4);
    t.deepEqual(p.map((i) => i + 1), new prray_1.Prray(2, 3, 4, 5));
    t.deepEqual([...p], [1, 2, 3, 4]);
    t.deepEqual(JSON.stringify(p), JSON.stringify([1, 2, 3, 4]));
    let ix = 1;
    for (const item of p) {
        t.is(item, ix++);
    }
    ix = 1;
    for (const item in p) {
        t.is(p[item], ix++);
    }
});
const addAsync = (i) => delay_1.default(100).then(() => i + 1);
ava_1.default('prraypromise mapAsync', async (t) => {
    const pp = prraypromise_1.prraypromise(Promise.resolve([1, 2, 3, 4]));
    t.deepEqual(await pp, [1, 2, 3, 4]);
    t.deepEqual(await pp.mapAsync(addAsync), [2, 3, 4, 5]);
    t.deepEqual(await pp.mapAsync(addAsync).mapAsync(addAsync, 2), [3, 4, 5, 6]);
});
ava_1.default('prray mapAsync', async (t) => {
    const p = new prray_1.Prray(1, 2, 3, 4);
    t.deepEqual(await p.mapAsync(addAsync, 2), [2, 3, 4, 5]);
    t.deepEqual(await p.mapAsync(addAsync).mapAsync(addAsync), [3, 4, 5, 6]);
    t.deepEqual(await p.mapAsync(addAsync)
        .mapAsync(addAsync)
        .mapAsync(addAsync)
        .mapAsync(addAsync)
        .mapAsync(addAsync), [6, 7, 8, 9]);
});
const gt2Async = (i) => delay_1.default(200).then(() => i > 2);
ava_1.default('prraypromise filterAsync', async (t) => {
    const pp = prraypromise_1.prraypromise(Promise.resolve([1, 2, 3, 4]));
    t.deepEqual(await pp, [1, 2, 3, 4]);
    t.deepEqual(await pp.filterAsync(gt2Async), [3, 4]);
    t.deepEqual(await pp.mapAsync(addAsync).filterAsync(gt2Async, 2), [3, 4, 5]);
});
ava_1.default('prray filterAsync', async (t) => {
    const p = new prray_1.Prray(1, 2, 3, 4);
    t.deepEqual(await p.filterAsync(gt2Async, 2), [3, 4]);
    t.deepEqual(await p.mapAsync(addAsync).filterAsync(gt2Async), [3, 4, 5]);
    t.deepEqual(await p.filterAsync(gt2Async).mapAsync(addAsync), [4, 5]);
});
const sumAsync = (sum, c) => delay_1.default(100).then(() => sum + c);
ava_1.default('prraypromise reduceAsync', async (t) => {
    const pp = prraypromise_1.prraypromise(Promise.resolve([1, 2, 3, 4]));
    t.deepEqual(await pp, [1, 2, 3, 4]);
    t.deepEqual(await pp.reduceAsync(sumAsync, 0), 10);
    t.deepEqual(await pp.mapAsync(addAsync).reduceAsync(sumAsync, 0, 2), 14);
});
ava_1.default('prray reduceAsync', async (t) => {
    const p = new prray_1.Prray(1, 2, 3, 4);
    t.deepEqual(await p.reduceAsync(sumAsync, 0, 2), 10);
    t.deepEqual(await p.filterAsync(gt2Async).reduceAsync(sumAsync, 0), 7);
});
ava_1.default('prraypromise toArray', async (t) => {
    const pp = prraypromise_1.prraypromise(Promise.resolve([1, 2, 3, 4]));
    t.deepEqual(await pp.toArray(), [1, 2, 3, 4]);
    t.deepEqual(await pp.mapAsync(addAsync).toArray(), [2, 3, 4, 5]);
});
ava_1.default('prray toArray', async (t) => {
    const p = new prray_1.Prray(1, 2, 3, 4);
    t.deepEqual(await p.toArray(), [1, 2, 3, 4]);
    t.deepEqual(await p.filterAsync(gt2Async).toArray(), [3, 4]);
});
const testAsync = (result) => delay_1.default(100).then(() => result);
ava_1.default('prraypromise everyAsync', async (t) => {
    t.deepEqual(await prraypromise_1.prraypromise(Promise.resolve([true, true])).everyAsync(testAsync), true);
    t.deepEqual(await prraypromise_1.prraypromise(Promise.resolve([true, false])).everyAsync(testAsync), false);
    t.deepEqual(await prraypromise_1.prraypromise(Promise.resolve([false, false])).everyAsync(testAsync, 5), false);
    t.deepEqual(await prraypromise_1.prraypromise(Promise.resolve([true, true, false])).everyAsync(testAsync, 1), false);
});
ava_1.default('prray everyAsync', async (t) => {
    t.deepEqual(await src_1.default([true, true]).everyAsync(testAsync), true);
    t.deepEqual(await src_1.default([false, true]).everyAsync(testAsync), false);
    t.deepEqual(await src_1.default([false, false]).everyAsync(testAsync, 5), false);
    t.deepEqual(await src_1.default([true, false, true]).everyAsync(testAsync, 2), false);
});
ava_1.default('prraypromise someAsync', async (t) => {
    t.deepEqual(await prraypromise_1.prraypromise(Promise.resolve([true, true])).someAsync(testAsync), true);
    t.deepEqual(await prraypromise_1.prraypromise(Promise.resolve([true, false])).someAsync(testAsync), true);
    t.deepEqual(await prraypromise_1.prraypromise(Promise.resolve([false, false])).someAsync(testAsync, 5), false);
    t.deepEqual(await prraypromise_1.prraypromise(Promise.resolve([true, true, false])).someAsync(testAsync, 1), true);
    t.deepEqual(await prraypromise_1.prraypromise(Promise.resolve([true, true, true])).someAsync(testAsync), true);
});
ava_1.default('prray someAsync', async (t) => {
    t.deepEqual(await src_1.default([true, true]).someAsync(testAsync), true);
    t.deepEqual(await src_1.default([false, true]).someAsync(testAsync), true);
    t.deepEqual(await src_1.default([false, false]).someAsync(testAsync, 5), false);
    t.deepEqual(await src_1.default([true, false, true]).someAsync(testAsync, 2), true);
});
ava_1.default('prraypromise findAsync', async (t) => {
    t.deepEqual(await prraypromise_1.prraypromise(Promise.resolve([1, 2, 3])).findAsync(gt2Async), 3);
    t.deepEqual(await prraypromise_1.prraypromise(Promise.resolve([0, 0])).findAsync(gt2Async), null);
    t.deepEqual(await prraypromise_1.prraypromise(Promise.resolve([0, 2, 3])).findAsync(gt2Async, 1), 3);
    t.deepEqual(await prraypromise_1.prraypromise(Promise.resolve([3])).findAsync(gt2Async, 5), 3);
});
ava_1.default('prray findAsync', async (t) => {
    t.deepEqual(await src_1.default([0, 1]).findAsync(gt2Async), null);
    t.deepEqual(await src_1.default([3]).findAsync(gt2Async, 4), 3);
    t.deepEqual(await src_1.default([2, 3, 0, 1]).findAsync(gt2Async, 5), 3);
});
ava_1.default('prraypromise findIndexAsync', async (t) => {
    t.deepEqual(await prraypromise_1.prraypromise(Promise.resolve([1, 2, 3])).findIndexAsync(gt2Async), 2);
    t.deepEqual(await prraypromise_1.prraypromise(Promise.resolve([0, 0])).findIndexAsync(gt2Async), -1);
    t.deepEqual(await prraypromise_1.prraypromise(Promise.resolve([0, 2, 3])).findIndexAsync(gt2Async, 1), 2);
    t.deepEqual(await prraypromise_1.prraypromise(Promise.resolve([3])).findIndexAsync(gt2Async, 5), 0);
});
ava_1.default('prray findIndexAsync', async (t) => {
    t.deepEqual(await src_1.default([0, 1]).findIndexAsync(gt2Async), -1);
    t.deepEqual(await src_1.default([3]).findIndexAsync(gt2Async, 4), 0);
    t.deepEqual(await src_1.default([2, 3, 0, 1]).findIndexAsync(gt2Async, 5), 1);
});
const errorAsync = () => delay_1.default(100).then(() => {
    throw new Error('error');
});
ava_1.default('prraypromise catch', async (t) => {
    const pp = prraypromise_1.prraypromise(Promise.resolve([1, 2, 3, 4]));
    t.deepEqual(await pp.mapAsync(errorAsync).catch(() => 110), 110);
    t.deepEqual(await pp.mapAsync((i) => errorAsync().catch(() => 0)).mapAsync(addAsync), [1, 1, 1, 1]);
});

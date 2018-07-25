"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const prraypromise_1 = require("../src/prraypromise");
const prray_1 = require("../src/prray");
const delay_1 = __importDefault(require("delay"));
ava_1.default('array compatibility', (t) => {
    const p = new prray_1.Prray(1, 2, 3, 4);
    t.is(Array.isArray(p), true);
    t.is(p instanceof prray_1.Prray, true);
    t.is(p.length, 4);
    t.deepEqual(p.map((i) => i + 1), new prray_1.Prray(2, 3, 4, 5));
    t.deepEqual([...p], [1, 2, 3, 4]);
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
    t.deepEqual(await pp.mapAsync(addAsync).mapAsync(addAsync), [3, 4, 5, 6]);
});
ava_1.default('prray mapAsync', async (t) => {
    const p = new prray_1.Prray(1, 2, 3, 4);
    t.deepEqual(await p.mapAsync(addAsync), [2, 3, 4, 5]);
    t.deepEqual(await p.mapAsync(addAsync).mapAsync(addAsync), [3, 4, 5, 6]);
});
const gt2Async = (i) => delay_1.default(200).then(() => i > 2);
ava_1.default('prraypromise filterAsync', async (t) => {
    const pp = prraypromise_1.prraypromise(Promise.resolve([1, 2, 3, 4]));
    t.deepEqual(await pp, [1, 2, 3, 4]);
    t.deepEqual(await pp.filterAsync(gt2Async), [3, 4]);
    t.deepEqual(await pp.mapAsync(addAsync).filterAsync(gt2Async), [3, 4, 5]);
});
ava_1.default('prray filterAsync', async (t) => {
    const p = new prray_1.Prray(1, 2, 3, 4);
    t.deepEqual(await p.filterAsync(gt2Async), [3, 4]);
    t.deepEqual(await p.mapAsync(addAsync).filterAsync(gt2Async), [3, 4, 5]);
    t.deepEqual(await p.filterAsync(gt2Async).mapAsync(addAsync), [4, 5]);
});
const sumAsync = (sum, c) => delay_1.default(100).then(() => sum + c);
ava_1.default('prraypromise reduceAsync', async (t) => {
    const pp = prraypromise_1.prraypromise(Promise.resolve([1, 2, 3, 4]));
    t.deepEqual(await pp, [1, 2, 3, 4]);
    t.deepEqual(await pp.reduceAsync(sumAsync, 0), 10);
    t.deepEqual(await pp.mapAsync(addAsync).reduceAsync(sumAsync, 0), 14);
});
ava_1.default('prray reduceAsync', async (t) => {
    const p = new prray_1.Prray(1, 2, 3, 4);
    t.deepEqual(await p.reduceAsync(sumAsync, 0), 10);
    t.deepEqual(await p.filterAsync(gt2Async).reduceAsync(sumAsync, 0), 7);
});

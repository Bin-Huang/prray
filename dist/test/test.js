"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const prraypromise_1 = require("../src/prraypromise");
const prray_1 = require("../src/prray");
const delay_1 = __importDefault(require("delay"));
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

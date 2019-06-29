"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ppromise_1 = require("./ppromise");
const p_map_1 = __importDefault(require("p-map"));
const p_filter_1 = __importDefault(require("p-filter"));
// import pReduce from 'p-reduce'
const p_every_1 = __importDefault(require("p-every"));
const prraypromise_1 = require("./prraypromise");
exports.everyAsync = function (tester, concurrency) {
    return this.then((r) => concurrency ? p_every_1.default(r, tester, { concurrency }) : p_every_1.default(r, tester));
};
exports.someAsync = function (tester, concurrency) {
    const negate = async (item, ix) => !(await tester(item, ix));
    return this.then((r) => concurrency ? p_every_1.default(r, negate, { concurrency }) : p_every_1.default(r, negate)).then(r => !r);
};
class EndError extends Error {
    constructor(ele, ix) {
        super();
        this.ele = ele;
        this.ix = ix;
    }
}
function find(datas, tester, opts) {
    const finder = (ele, ix) => Promise.resolve(tester(ele, ix)).then((r) => {
        if (r) {
            throw new EndError(ele, ix);
        }
    });
    return p_map_1.default(datas, finder, opts).then(() => null).catch((r) => {
        if (r instanceof EndError) {
            return r;
        }
        return null;
    });
}
exports.findAsync = function (tester, concurrency) {
    return this.then((r) => concurrency ? find(r, tester, { concurrency }) : find(r, tester))
        .then((r) => r === null ? null : r.ele);
};
exports.findIndexAsync = function (tester, concurrency) {
    return this.then((r) => concurrency ? find(r, tester, { concurrency }) : find(r, tester))
        .then((r) => r === null ? -1 : r.ix);
};
exports.toArray = function () {
    return this.then((r) => [...r]);
};
exports.mapAsync = function (mapper, concurrency) {
    const prom = this.then((r) => concurrency ? p_map_1.default(r, mapper, { concurrency }) : p_map_1.default(r, mapper));
    return prraypromise_1.prraypromise(prom);
};
exports.filterAsync = function (filterer, concurrency) {
    const prom = this.then((r) => concurrency ? p_filter_1.default(r, filterer, { concurrency }) : p_filter_1.default(r, filterer));
    return prraypromise_1.prraypromise(prom);
};
async function reduce(datas, reducer, init) {
    // TODO: Better implementation
    let result;
    let slices;
    if (init === undefined) {
        result = datas[0];
        slices = datas.slice(1);
    }
    else {
        result = init;
        slices = datas;
    }
    for (let ix = 0; ix < slices.length; ix++) {
        result = await reducer(result, slices[ix], ix);
    }
    return result;
}
exports.reduceAsync = function (reducer, initialValue) {
    const prom = this.then((r) => reduce(r, reducer, initialValue));
    return ppromise_1.ppromise(prom); // TODO: if return promise<array>, returns prraypromise<array>???
};

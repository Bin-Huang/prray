"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ppromise_1 = require("./ppromise");
const p_map_1 = __importDefault(require("p-map"));
const p_filter_1 = __importDefault(require("p-filter"));
const p_reduce_1 = __importDefault(require("p-reduce"));
const mapAsync = function (mapper, concurrency) {
    const prom = this.then((r) => concurrency ? p_map_1.default(r, mapper, { concurrency }) : p_map_1.default(r, mapper));
    return prraypromise(prom);
};
const filterAsync = function (filterer, concurrency) {
    const prom = this.then((r) => concurrency ? p_filter_1.default(r, filterer, { concurrency }) : p_filter_1.default(r, filterer));
    return prraypromise(prom);
};
const reduceAsync = function (reducer, initialValue, concurrency) {
    const prom = this.then((r) => concurrency ? p_reduce_1.default(r, reducer, initialValue, { concurrency }) : p_reduce_1.default(r, reducer, initialValue));
    return ppromise_1.ppromise(prom); // TODO: 如果是 array，考虑返回 prraypromise
};
const toArray = function () {
    return this.then((r) => [...r]);
};
const methods = { mapAsync, filterAsync, reduceAsync, toArray };
function prraypromise(promise) {
    for (const method in methods) {
        promise[method] = methods[method];
    }
    return promise;
}
exports.prraypromise = prraypromise;

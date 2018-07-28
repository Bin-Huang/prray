"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prraypromise_1 = require("./prraypromise");
class Prray extends Array {
    constructor(...arg) {
        super(...arg);
    }
    mapAsync(mapper, concurrency) {
        return prraypromise_1.prraypromise(Promise.resolve(this)).mapAsync(mapper, concurrency);
    }
    filterAsync(filterer, concurrency) {
        return prraypromise_1.prraypromise(Promise.resolve(this)).filterAsync(filterer, concurrency);
    }
    reduceAsync(reducer, initialValue, concurrency) {
        return prraypromise_1.prraypromise(Promise.resolve(this)).reduceAsync(reducer, initialValue, concurrency);
    }
    everyAsync(tester, concurrency) {
        return prraypromise_1.prraypromise(Promise.resolve(this)).everyAsync(tester, concurrency);
    }
    someAsync(tester, concurrency) {
        return prraypromise_1.prraypromise(Promise.resolve(this)).someAsync(tester, concurrency);
    }
    findAsync(tester, concurrency) {
        return prraypromise_1.prraypromise(Promise.resolve(this)).findAsync(tester, concurrency);
    }
    toArray() {
        return [...this];
    }
}
exports.Prray = Prray;

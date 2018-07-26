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
    toArray() {
        return [...this];
    }
}
exports.Prray = Prray;

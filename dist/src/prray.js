"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prraypromise_1 = require("./prraypromise");
class Prray extends Array {
    constructor(...arg) {
        super(...arg);
    }
    mapAsync(mapper) {
        return prraypromise_1.prraypromise(Promise.resolve(this)).mapAsync(mapper);
    }
    filterAsync(filterer) {
        return prraypromise_1.prraypromise(Promise.resolve(this)).filterAsync(filterer);
    }
}
exports.Prray = Prray;

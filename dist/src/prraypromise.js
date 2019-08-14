"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./methods/index");
function prraypromise(promise) {
    const p = promise;
    // monkey patch
    for (const name in index_1.methods) {
        p[name] = index_1.methods[name];
    }
    return p;
}
exports.prraypromise = prraypromise;

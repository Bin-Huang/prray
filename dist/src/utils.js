"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pipe(promise, func) {
    return promise.then(func);
}
exports.pipe = pipe;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = function () {
    return this.then((r) => [...r]);
};

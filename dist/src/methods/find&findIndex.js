"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const p_map_1 = __importDefault(require("p-map"));
class EndError extends Error {
    constructor(ele, ix) {
        super();
        this.ele = ele;
        this.ix = ix;
    }
}
function _find(datas, tester, opts) {
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
exports.findIndex = function (tester, concurrency) {
    return this.then((r) => concurrency ? _find(r, tester, { concurrency }) : _find(r, tester))
        .then((r) => r === null ? -1 : r.ix);
};
exports.find = function (tester, concurrency) {
    return this.then((r) => concurrency ? _find(r, tester, { concurrency }) : _find(r, tester))
        .then((r) => r === null ? null : r.ele);
};

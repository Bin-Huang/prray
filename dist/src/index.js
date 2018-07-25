"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const pMap = __importStar(require("p-map"));
const pReduce = __importStar(require("p-reduce"));
const pFilter = __importStar(require("p-filter"));
const pLocate = __importStar(require("p-locate"));
const pEvery = __importStar(require("p-every"));
class Prray extends Array {
    constructor(arr) {
        super(...arr);
    }
    toArray() {
        return [...this];
    }
    async mapAsync(mapper) {
        const result = await pMap(this, mapper);
        return P(result);
    }
    async filterAsync(filterer) {
        const result = await pFilter(this, filterer);
        return P(result);
    }
    async reduceAsync(reducer, initialValue) {
        return pReduce(this, reducer, initialValue);
    }
    async reduceRightAsync(reducer, initialValue) {
        return pReduce(P(this.toArray().reverse()), reducer, initialValue); // TODO: test
    }
    async findAsync(tester) {
        return pLocate(this, tester); // preserveOrder 设置默认为 false，无视顺序
    }
    async findIndexAsync(tester) {
        // TODO: 
    }
    async sortByAsync() {
        // TODO: 
    }
    // TODO: ITester
    async everyAsync(tester) {
        return pEvery(this, tester);
    }
    // TODO: ITester
    async someAsync(tester) {
        const tester2 = (v) => !tester(v);
        return !this.everyAsync(tester2); // TODO: test
    }
}
exports.Prray = Prray;
async function P(datas) {
    return new Prray(datas);
}
exports.default = P;

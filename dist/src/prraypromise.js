"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const p_map_1 = __importDefault(require("p-map"));
const p_filter_1 = __importDefault(require("p-filter"));
const methods = { mapAsync, filterAsync };
function prraypromise(promise) {
    for (const method in methods) {
        promise[method] = methods[method];
    }
    return promise;
}
exports.prraypromise = prraypromise;
function mapAsync(mapper) {
    const prom = this.then((r) => p_map_1.default(r, mapper));
    return prraypromise(prom);
}
exports.mapAsync = mapAsync;
function filterAsync(filterer) {
    const prom = this.then((r) => p_filter_1.default(r, filterer));
    return prraypromise(prom);
}
exports.filterAsync = filterAsync;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const p_map_1 = __importDefault(require("p-map"));
const methods = { mapAsync };
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

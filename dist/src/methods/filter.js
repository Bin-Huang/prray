"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const p_filter_1 = __importDefault(require("p-filter"));
const prraypromise_1 = require("../prraypromise");
exports.filter = function (filterer, concurrency) {
    const prom = this.then((r) => concurrency ? p_filter_1.default(r, filterer, { concurrency }) : p_filter_1.default(r, filterer));
    return prraypromise_1.prraypromise(prom);
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const p_map_1 = __importDefault(require("p-map"));
const prraypromise_1 = require("../prraypromise");
exports.map = function (mapper, concurrency) {
    const prom = this.then((r) => concurrency ? p_map_1.default(r, mapper, { concurrency }) : p_map_1.default(r, mapper));
    return prraypromise_1.prraypromise(prom);
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const p_every_1 = __importDefault(require("p-every"));
exports.every = function (tester, concurrency) {
    return this.then((r) => concurrency ? p_every_1.default(r, tester, { concurrency }) : p_every_1.default(r, tester));
};

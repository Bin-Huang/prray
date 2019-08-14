"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const p_every_1 = __importDefault(require("p-every"));
exports.some = function (tester, concurrency) {
    const negate = async (item, ix) => !(await tester(item, ix));
    return this.then((r) => concurrency ? p_every_1.default(r, negate, { concurrency }) : p_every_1.default(r, negate)).then(r => !r);
};

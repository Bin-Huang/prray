"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const delay_1 = __importDefault(require("delay"));
const p_reduce_1 = __importDefault(require("p-reduce"));
const sumAsync = (sum, c) => delay_1.default(100).then(() => sum + c);
(async () => {
    const arr = [1, 1, 1, 1];
    console.log(await p_reduce_1.default(arr, sumAsync));
})();

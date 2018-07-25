"use strict";
/**
 * Ben Huang
 * tohuangbin@gmail.com
 * 2018-7-25
 */
Object.defineProperty(exports, "__esModule", { value: true });
const prray_1 = require("./prray");
function p(arr) {
    return new prray_1.Prray(...arr);
}
module.exports = p;
exports.default = p;

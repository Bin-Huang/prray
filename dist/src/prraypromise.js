"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const methods = __importStar(require("./methods"));
function prraypromise(promise) {
    for (const method in methods) {
        promise[method] = methods[method];
    }
    return promise;
}
exports.prraypromise = prraypromise;

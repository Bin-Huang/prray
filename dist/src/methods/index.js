"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const map_1 = require("./map");
const filter_1 = require("./filter");
const every_1 = require("./every");
const some_1 = require("./some");
const toArray_1 = require("./toArray");
const reduce_1 = require("./reduce");
const find_findIndex_1 = require("./find&findIndex");
exports.methods = {
    map: map_1.map,
    filter: filter_1.filter,
    reduce: reduce_1.reduce,
    every: every_1.every,
    some: some_1.some,
    find: find_findIndex_1.find,
    findIndex: find_findIndex_1.findIndex,
    toArray: toArray_1.toArray,
};

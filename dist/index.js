"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = tslib_1.__importDefault(require("./config"));
const init_1 = tslib_1.__importDefault(require("./init"));
// import config from "./config";
// 主的流程控制
let apply = (action, ...args) => {
    const actions = {
        config: config_1.default,
        init: init_1.default
    };
    actions[action](...args);
};
exports.default = apply;

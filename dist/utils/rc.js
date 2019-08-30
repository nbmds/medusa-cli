"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const constants_1 = require("./constants");
const ini_1 = require("ini");
const util_1 = require("util");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const exits = util_1.promisify(fs_1.default.exists);
const readFile = util_1.promisify(fs_1.default.readFile);
const writeFile = util_1.promisify(fs_1.default.writeFile);
//RC 是配置文件
//DEFAULTS 是默认的配置
exports.get = async (key) => {
    const exit = await exits(constants_1.RC);
    let opts;
    if (exit) {
        opts = await readFile(constants_1.RC, "utf8");
        opts = ini_1.decode(opts);
        return opts[key];
    }
    return "";
};
exports.getAll = async () => {
    const exit = await exits(constants_1.RC);
    let opts;
    if (exit) {
        opts = await readFile(constants_1.RC, "utf8");
        opts = ini_1.decode(opts);
        return opts;
    }
    return {};
};
exports.set = async (key, value) => {
    const exit = await exits(constants_1.RC);
    let opts;
    if (exit) {
        opts = await readFile(constants_1.RC, "utf8");
        opts = ini_1.decode(opts);
        if (key === "default") {
            return;
        }
        if (!key) {
            console.log(chalk_1.default.red(chalk_1.default.bold("Error:")), chalk_1.default.red("key is required"));
            return;
        }
        if (!value) {
            console.log(chalk_1.default.red(chalk_1.default.bold("Error:")), chalk_1.default.red("value is required"));
            return;
        }
        Object.assign(opts, { [key]: value });
    }
    else {
        opts = Object.assign(constants_1.DEFAULTS, { [key]: value });
    }
    await writeFile(constants_1.RC, ini_1.encode(opts), "utf8");
};
exports.remove = async (key) => {
    const exit = await exits(constants_1.RC);
    let opts;
    if (exit) {
        opts = await readFile(constants_1.RC, "utf8");
        opts = ini_1.decode(opts);
        delete opts[key];
        await writeFile(constants_1.RC, ini_1.encode(opts), "utf8");
    }
};

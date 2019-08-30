"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commander_1 = tslib_1.__importDefault(require("commander"));
const constants_1 = require("./utils/constants");
const index_1 = tslib_1.__importDefault(require("./index"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
/**
 * medusa commands
 *    - config
 *    - init
 */
let actionMap = {
    init: {
        description: "generate a new project from a template",
        usages: ["medusa init templateName projectName"]
    },
    config: {
        alias: "cfg",
        description: "config .medusarc",
        usages: [
            "medusa config set <k> <v>",
            "medusa config get <k>",
            "medusa config remove <k>"
        ]
    }
    //other commands
};
// 添加 init / config 命令
Object.keys(actionMap).forEach(action => {
    commander_1.default
        .command(action)
        .description(actionMap[action].description)
        .alias(actionMap[action].alias)
        .action(() => {
        switch (action) {
            case "config":
                // 配置
                index_1.default(action, ...process.argv.slice(3));
                break;
            case "init":
                index_1.default(action, ...process.argv.slice(3));
                break;
            default:
                break;
        }
    });
});
function help() {
    console.log("\r\nUsage:");
    Object.keys(actionMap).forEach(action => {
        actionMap[action].usages.forEach(usage => {
            console.log("  - " + usage);
        });
    });
    console.log("\r");
}
commander_1.default.usage("<command> [options]");
// medusa -h
commander_1.default.on("-h", help);
commander_1.default.on("--help", help);
// medusa -V   VERSION 为 package.json 中的版本号
commander_1.default.version(constants_1.VERSION, "-V --version").parse(process.argv);
// medusa 不带参数时
if (!process.argv.slice(2).length) {
    commander_1.default.outputHelp(make_green);
}
function make_green(txt) {
    return chalk_1.default.green(txt);
}

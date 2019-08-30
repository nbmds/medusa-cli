"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const get_1 = require("./utils/get");
const ora_1 = tslib_1.__importDefault(require("ora"));
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const log_symbols_1 = tslib_1.__importDefault(require("log-symbols"));
exports.default = async (projectName) => {
    // 项目不存在
    if (!fs_1.default.existsSync(projectName)) {
        // 命令行交互
        inquirer_1.default
            .prompt([
            {
                name: "description",
                message: "Please enter the project description: "
            },
            {
                name: "author",
                message: "Please enter the author name: "
            }
        ])
            .then(async (answer) => {
            // 下载模板 选择模板
            // 通过配置文件，获取模板信息
            let loading = ora_1.default("downloading template ...");
            loading.start();
            get_1.downloadLocal(projectName).then(() => {
                loading.succeed();
                const fileName = `${projectName}/package.json`;
                if (fs_1.default.existsSync(fileName)) {
                    const data = fs_1.default.readFileSync(fileName).toString();
                    let json = JSON.parse(data);
                    json.name = projectName;
                    json.author = answer.author;
                    json.description = answer.description;
                    // 修改项目文件夹中 package.json 文件
                    fs_1.default.writeFileSync(fileName, JSON.stringify(json, null, "\t"), "utf-8");
                    console.log(log_symbols_1.default.success, chalk_1.default.green("Project initialization finished!"));
                }
            }, () => {
                loading.fail();
            });
        });
    }
    else {
        // 项目已经存在
        console.log(log_symbols_1.default.error, chalk_1.default.red("The project already exists"));
    }
};

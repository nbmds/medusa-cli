"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const rc_1 = require("./rc");
const download_git_repo_1 = tslib_1.__importDefault(require("download-git-repo"));
exports.downloadLocal = async (projectName) => {
    let config = await rc_1.getAll();
    let api = `${config.registry}/${config.store}`;
    return new Promise((resolve, reject) => {
        // projectName 为下载到的本地目录
        download_git_repo_1.default(api, projectName, err => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};

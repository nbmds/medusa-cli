"use strict";
// 管理 .medusarc 文件 (当前用户目录下)
Object.defineProperty(exports, "__esModule", { value: true });
const rc_1 = require("./utils/rc");
let config = async (action, key, value) => {
    switch (action) {
        case "get":
            if (key) {
                let result = await rc_1.get(key);
                console.log(result);
            }
            else {
                let obj = await rc_1.getAll();
                Object.keys(obj).forEach(key => {
                    console.log(`${key}=${obj[key]}`);
                });
            }
            break;
        case "set":
            rc_1.set(key, value);
            break;
        case "remove":
            rc_1.remove(key);
            break;
        default:
            break;
    }
};
exports.default = config;

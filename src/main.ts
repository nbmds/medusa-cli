import program from "commander";
import { VERSION } from "./utils/constants";
import apply from "./index";
import chalk from "chalk";

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
  program
    .command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias)
    .action(() => {
      switch (action) {
        case "config":
          // 配置
          apply(action, ...process.argv.slice(3));
          break;
        case "init":
          apply(action, ...process.argv.slice(3));
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
program.usage("<command> [options]");
// medusa -h
program.on("-h", help);
program.on("--help", help);
// medusa -V   VERSION 为 package.json 中的版本号
program.version(VERSION, "-V --version").parse(process.argv);

// medusa 不带参数时
if (!process.argv.slice(2).length) {
  program.outputHelp(make_green);
}

function make_green(txt) {
  return chalk.green(txt);
}
